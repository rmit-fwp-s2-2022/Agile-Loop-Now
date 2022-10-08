import {
  Box,
  Container,
  Flex,
  Avatar,
  Heading,
  Textarea,
  IconButton,
  Button,
  Spacer,
  ButtonGroup,
  useDisclosure,
  Collapse,
  Text,
  Editable,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import EditableControls from "./EditableControls";
import axios from "axios";

import * as Yup from "yup";
import { Formik } from "formik";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { DeleteIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef } from "react";
import { createPost, deletePost, editPost, editImage } from "../data/Posts";
import { getPosts } from "../data/repository";
import { Fade } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Forum(props) {
  const toast = useToast();
  const hiddenFileInput = useRef(null);
  const { isOpen, onToggle } = useDisclosure();
  const [content, setContent] = useState(""); // Used to set react quill input
  const [editContent, setEditContent] = useState("");
  const [posts, setPosts] = useState([]); // Used to set the list of post from API
  const [image, setImage] = useState(null);
  const [button, setButton] = useState(false);

  const API = "https://api.cloudinary.com/v1_1/aglie-loop/image/upload";

  //Fetch all the posts made by all the users

  useEffect(() => {
    async function loadPosts() {
      const postData = await getPosts();
      console.log(postData);
      setPosts(postData);
    }
    loadPosts();
  }, [setPosts]);

  const onEdit = () => {};
  //This function calls an API from Cloundinary and stores the images uploaded from the user in the cloud
  //Cloundinary returns a link to the image
  const onSubmit = async () => {
    let post = {};
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "my-uploads");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const timeStamp = date + " " + time;

    if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      toast({
        title: "Error",
        description: "Field must not be blank.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (content.length > 600) {
      toast({
        title: "Error",
        description: "Write less words.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (image !== null) {
      const link = await axios.post(API, formData);
      console.log(link.data.secure_url);

      post = {
        userEmail: props.user.email,
        content: content,
        link: link.data.secure_url,
        time: timeStamp,
      };
    } else {
      post = {
        userEmail: props.user.email,
        content: content,
        link: "",
        time: timeStamp,
      };
    }
    onToggle();
    createPost(post);
    setPosts(null);
  };

  const reset = () => {
    setImage(null);
    setContent(null);
  };

  //Helper function for detecting image upload changes
  const onPressed = () => {
    hiddenFileInput.current.click();
  };

  //Simple function that deletes the specified post
  const onDelete = (time) => {
    console.log(time);
    deletePost(time);
    // setPosts(getPosts());
  };

  //This fucntion lets users upload their image to the staging area before being sent to Cloundinary
  const uploadFile = (files) => {
    const image = files[0];
    console.log(image);
    console.log("uploadfile");
    setButton(true);
    setImage(image);
  };

  //This fucntion is used for editing the post's image and sends it to Cloundinary to get a new link
  const newImage = async (timeStamp) => {
    setButton(false);
    await editImage(image, timeStamp);
    console.log("newImage");
    // setPosts(getPosts());
  };

  return (
    <Box minH={"87vh"}>
      <Container maxW="50%">
        <Box mb={2}>
          <Button colorScheme="teal" onClick={onToggle}>
            {isOpen ? "Cancel" : "Create Post"}
          </Button>
        </Box>

        <Collapse in={isOpen} animateOpacity>
          <Box p={4} rounded={"lg"} borderWidth={1}>
            <Flex>
              <Box pt={2} pb={2}>
                <Avatar bg="teal.500" size={"md"} />
              </Box>
              <Box>
                <Heading size="sm" mt={2} p={3}>
                  {props.user.name}
                </Heading>
              </Box>
            </Flex>
            {image !== null && (
              <>
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    height={200}
                    width={400}
                  />
                </div>
              </>
            )}

            <ReactQuill
              placeholder="What's on your mind?"
              theme="snow"
              name="txt"
              value={content}
              onChange={setContent}
            />

            <Flex mt={3}>
              <IconButton
                type={"file"}
                size={"sm"}
                colorScheme="orange"
                icon={<FontAwesomeIcon size="2xl" icon={faImage} type="file" />}
                onClick={onPressed}
              />
              <input
                id="selector"
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                accept="image/*"
                onChange={(e) => uploadFile(e.target.files)}
              />
              <Spacer />
              <ButtonGroup>
                <Button colorScheme="teal" onClick={onSubmit}>
                  Post
                </Button>
                <Button
                  onClick={(e) => {
                    reset();
                  }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </Collapse>

        {/*map goes here*/}
        {posts !== null &&
          posts.map((post) => (
            <Box p={4} rounded={"lg"} borderWidth={1} mt={3}>
              <Flex>
                <Box pt={2} pb={2}>
                  <Avatar bg="teal.500" size={"md"} />
                </Box>
                <Box p={3}>
                  <Heading size="sm">{post.username}</Heading>
                  <Text color={"gray.500"} fontSize={"xs"}>
                    {" "}
                    Posted On {post.timeStamp}
                  </Text>
                </Box>
              </Flex>
              <Editable
                value={post.content}
                isPreviewFocusable={false}
                onSubmit={onEdit}
              >
                <EditablePreview />
                <ReactQuill
                  placeholder="What's on your mind?"
                  theme="snow"
                  name="txt"
                  value={post.content}
                  onChange={setEditContent}
                />
                <Spacer />
                {post.link !== "" ? (
                  <>
                    <div className="image-preview">
                      <img
                        src={post.link}
                        alt="preview"
                        height={200}
                        width={400}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {props.user.email === post.email && (
                  <Flex mt={3}>
                    <IconButton
                      size={"sm"}
                      colorScheme="orange"
                      icon={<FontAwesomeIcon size="2xl" icon={faImage} />}
                      onClick={onPressed}
                    >
                      <input
                        id="clicker"
                        type="file"
                        style={{ display: "none" }}
                        ref={hiddenFileInput}
                        accept="image/*"
                        onChange={(e) => uploadFile(e.target.files)}
                      />
                    </IconButton>

                    <Spacer />

                    <Fade in={button}>
                      <Button mr={4} onClick={() => newImage(post.time)}>
                        Save
                      </Button>
                    </Fade>
                    <IconButton
                      mr={4}
                      size={"sm"}
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => onDelete(post.time)}
                    ></IconButton>
                    <EditableControls />
                  </Flex>
                )}
              </Editable>
            </Box>
          ))}
      </Container>
    </Box>
  );
}

export default Forum;
