import {
  Box,
  Container,
  Center,
  Stack,
  Heading,
  Button,
  Text,
  Link,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";

// import { getUser } from "../data/User";
// import { generateCode, sendCode } from "../services/VerifyUser";
// import { setAuthentication } from "../data/User";

function Login(props) {
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (user) => {
    const data = await verifyUser(user.email, user.password);
    console.log(data);
    if (data !== null) {
      console.log("here2");
      props.loginUser(data);
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box minH={"87vh"}>
      <Center minH={"70vh"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Email must be a valid Email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values) => {
            onSubmit(values).then((response) => {
              console.log(response);
              if (response) {
                navigate("/authenticate");
              } else {
                toast({
                  title: "Error",
                  description: "Password or Username is not valid.",
                  status: "error",
                  duration: 6000,
                  isClosable: true,
                });
              }
            });
            // console.log(state);
            // setTimeout(() => {}, 1200);
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => (
            <Container
              maxW="md"
              boxShadow={"2xl"}
              rounded={"lg"}
              borderWidth={1}
              onSubmit={formik.handleSubmit}
              as="form"
            >
              <Box align={"center"} pt={8}>
                <Heading fontSize={"3xl"}>Log In</Heading>
              </Box>

              <Stack spacing={6} py={10} px={6}>
                <FormField
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  label={"Email Address"}
                />

                <FormField
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  label={"Password"}
                />

                <Box>
                  <Stack spacing={4}>
                    <Alert
                      status="success"
                      display={formik.isSubmitting ? "inherit" : "none"}
                    >
                      <AlertIcon />
                      Sending Verification Code!
                    </Alert>
                    <Button
                      type="submit"
                      isLoading={formik.isSubmitting}
                      bg={"red.400"}
                      color={"white"}
                      _hover={{ bg: "red.500" }}
                      minW={"100%"}
                    >
                      Sign In
                    </Button>

                    <Text
                      fontSize={"sm"}
                      color={"gray.600"}
                      align={"center"}
                      pt={5}
                    >
                      Don't have an account?{" "}
                      <Link as={RouteLink} to="/signup" color={"blue.400"}>
                        Sign Up
                      </Link>
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          )}
        </Formik>
      </Center>
    </Box>
  );
}
export default Login;
