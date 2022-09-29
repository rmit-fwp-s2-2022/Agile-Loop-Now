import {
  Box,
  Center,
  Container,
  Avatar,
  Stack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  InputRightElement,
  InputGroup,
  StackDivider,
  Button,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Collapse,
  AlertDialog,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Progress,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  editEmail,
  editName,
  deleteUser,
  getCurrentUser,
} from "../data/User";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditableControls from "./EditableControls";
import { findUser, createUser } from "../data/repository";

function Profile(props) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userJoinedOn, setUserJoinedOn] = useState("");
  const [alertName, setAlertName] = useState(false); //Visual cues on succesful name change
  const [alertEmail, setAlertEmail] = useState(false); //Visual cues on succesful email change
  const [isDeletingUser, setDeletingUser] = useState(false); //Whether a user is being deleted
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    async function loadUser() {
      const currentUser = await findUser(user.email);
      setUserName(currentUser.name);
      setUserEmail(currentUser.email);
      setUserJoinedOn(currentUser.createdAt);
      setIsLoading(false);
    }
    loadUser();
  }, []);


  function deleteAccount() {
    setDeletingUser(true);
    setTimeout(() => {
      deleteUser(userEmail);
      props.logout();
      navigate("/");
    }, 3000);
  }

  return (
    <Box minH={"87vh"}>
      <Center p={20}>
      {isLoading ?
       <div>Loading</div>
       :
        <Container maxW="sm" boxShadow={"2xl"} rounded={"lg"} borderWidth={1}>
          <Box pt={10} align={"center"}>
            <Avatar bg="teal.500" size={"2xl"} />
          </Box>
          <Stack
            spacing={5}
            p={10}
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Formik
              initialValues={{ name: userName }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name cannot be empty"),
              })}
              onSubmit={(value) => {
                if (userName !== value.name) {
                  editName(userEmail, value.name);
                  setAlertName(true);
                  setUserName(value.name);
                  setTimeout(() => {
                    setAlertName(false);
                  }, 3000);
                }
              }}
            >
              {(formik) => (
                <Box>
                  <Text color={"gray.500"} fontSize={"xs"}>
                    NAME
                  </Text>
                  <FormControl isInvalid={formik.errors.name}>
                    <InputGroup>
                      <Editable
                        fontSize={"lg"}
                        fontWeight={400}
                        isPreviewFocusable={false}
                        value={formik.values.name}
                        onSubmit={formik.handleSubmit}
                      >
                        <EditablePreview />
                        <Input
                          name="name"
                          as={EditableInput}
                          variant="flushed"
                          size={"xl"}
                          onChange={formik.handleChange}
                        />
                        <InputRightElement children={<EditableControls />} />
                      </Editable>
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </InputGroup>
                  </FormControl>
                  <Collapse in={alertName} animateOpacity>
                    <Alert status="success" mt={2}>
                      <AlertIcon />
                      Changed Name!
                    </Alert>
                  </Collapse>
                </Box>
              )}
            </Formik>
            <Formik
              initialValues={{ email: userEmail }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Email cannot be empty")
                  .email("Email must be a valid Email"),
              })}
              onSubmit={(value) => {
                if (userEmail !== value.email) {
                  editEmail(userEmail, value.email);
                  setAlertEmail(true);
                  setUserEmail(value.email);

                  setTimeout(() => {
                    setAlertEmail(false);
                  }, 3000);
                }
              }}
            >
              {(formik) => (
                <Box>
                  <Text color={"gray.500"} fontSize={"xs"}>
                    EMAIL
                  </Text>
                  <FormControl isInvalid={formik.errors.email}>
                    <InputGroup>
                      <Editable
                        fontSize={"lg"}
                        fontWeight={400}
                        isPreviewFocusable={false}
                        value={formik.values.email}
                        onSubmit={formik.handleSubmit}
                      >
                        <EditablePreview />
                        <Input
                          name="email"
                          as={EditableInput}
                          variant="flushed"
                          size={"xl"}
                          onChange={formik.handleChange}
                        />
                        <InputRightElement children={<EditableControls />} />
                      </Editable>
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>

                  <Collapse in={alertEmail} animateOpacity>
                    <Alert status="success" mt={2}>
                      <AlertIcon />
                      Changed Email!
                    </Alert>
                  </Collapse>
                </Box>
              )}
            </Formik>
            <Box>
              <Text color={"gray.500"} fontSize={"xs"}>
                JOINED ON
              </Text>
              <Text fontSize={"lg"} fontWeight={400}>
                {Intl.DateTimeFormat("en-GB", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(userJoinedOn))}
              </Text>
            </Box>
          </Stack>
          <Box pl={10} pr={10} pb={10}>
            <Button colorScheme="red" onClick={onOpen} minW={"100%"}>
              DELETE ACCOUNT
            </Button>

            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Account
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    {isDeletingUser ? (
                      <Box>
                        <Text pb={3}>
                          Deleting all your account data including posts
                        </Text>
                        <Progress
                          size="sm"
                          colorScheme="teal"
                          isIndeterminate
                        />
                      </Box>
                    ) : (
                      <Text>Confirm to delete your account</Text>
                    )}
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={deleteAccount}
                      ml={3}
                      isLoading={isDeletingUser}
                    >
                      Confirm
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        </Container>
        }
      </Center>
    </Box>
  );
}

export default Profile;
