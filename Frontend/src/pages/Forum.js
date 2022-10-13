import {
  Box,
  Container,
  Flex,
  IconButton,
  ButtonGroup,
  useEditableControls,
  Avatar,
  Heading,
  Button,
  Spacer,
  useDisclosure,
  Collapse,
  Text,
  Editable,
  EditablePreview,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

import * as Yup from "yup";
import { Formik } from "formik";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef } from "react";
import { editPost, editImage } from "../data/Posts";
import { getPosts, createPost, deletePost } from "../data/repository";
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
  const [editing, setEditing] = useState(false);
  const [button, setButton] = useState(false);

  const API = "https://api.cloudinary.com/v1_1/aglie-loop/image/upload";

  useEffect(() => {
    async function loadPosts() {
      const postData = await getPosts();
      console.log(postData);
      setPosts(postData);
    }
    loadPosts();
  }, [setPosts]);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    setEditing(isEditing);
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  //Fetch all the posts made by all the users

  const onEdit = async () => {
    let post = {};
  };
  //This function calls an API from Cloundinary and stores the images uploaded from the user in the cloud
  //Cloundinary returns a link to the image
  const onSubmit = async () => {
    let post = {};
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "my-uploads");

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
      };
    } else {
      post = {
        userEmail: props.user.email,
        content: content,
        link: "",
      };
    }
    onToggle();
    const newPost = await createPost(post);
    setPosts([...posts, newPost]);
    reset();
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
  const onDelete = async (id) => {
    await deletePost(id);
    const getNewPosts = await getPosts();
    setPosts(getNewPosts);
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
            <Box key={post.post_id} p={4} rounded={"lg"} borderWidth={1} mt={3}>
              <Flex>
                <Box pt={2} pb={2}>
                  <Avatar bg="teal.500" size={"md"} />
                </Box>
                <Box p={3}>
                  <Heading size="sm">{post.name}</Heading>
                  <Text color={"gray.500"} fontSize={"xs"}>
                    {" "}
                    Posted On{" "}
                    {Intl.DateTimeFormat("en-GB", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(post.createdAt))}
                  </Text>
                </Box>
              </Flex>
              <Editable
                isPreviewFocusable={false}
                onSubmit={() => {
                  onEdit(post.post_id);
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

                <EditablePreview />
                {editing && (
                  <ReactQuill
                    theme="snow"
                    name="txt"
                    defaultValue={post.content}
                    onChange={setEditContent}
                  />
                )}

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
                {props.user.email === post.userEmail && (
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
                      <Button mr={4} onClick={() => newImage(post.id)}>
                        Save
                      </Button>
                    </Fade>
                    <IconButton
                      mr={4}
                      size={"sm"}
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => onDelete(post.post_id)}
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
