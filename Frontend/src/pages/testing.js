import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import {
//   Box,
//   Flex,
//   Avatar,
//   Heading,
//   Button,
//   FormControl,
//   Textarea,
//   FormErrorMessage,
// } from "@chakra-ui/react";

// import * as Yup from "yup";
// import { Field, Formik } from "formik";

// function Testing() {
//   const onSubmit = async (content) => {
//     console.log(content);
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={{ txt: "" }}
//         validationSchema={Yup.object({
//           txt: Yup.string()
//             .required("Must contain text")
//             .max(250, "Write less please"),
//         })}
//         onSubmit={(value) => {
//           onSubmit(value.txt);
//         }}
//       >
//         {(formik) => (
//           <Box p={4} rounded={"lg"} borderWidth={1}>
//             <Flex>
//               <Box pt={2} pb={2}>
//                 <Avatar bg="teal.500" size={"md"} />
//               </Box>
//               <Box>
//                 <Heading size="sm" mt={2} p={3}>
//                   something
//                 </Heading>
//               </Box>
//             </Flex>

//             <FormControl isInvalid={formik.errors.txt}>
//               <ReactQuill
//                 placeholder="What's on your mind?"
//                 theme="snow"
//                 name="txt"
//                 value={formik.values.txt}
//                 onChange={formik.handleChange}
//               ></ReactQuill>

//               <FormErrorMessage>{formik.errors.txt}</FormErrorMessage>
//             </FormControl>
//             <Button colorScheme="teal" onClick={formik.handleSubmit}>
//               Post
//             </Button>
//             <Flex mt={3}></Flex>
//           </Box>
//         )}
//       </Formik>
//     </div>
//   );
// }

import { Field, Formik, Form } from "formik";
import { FormControl, FormErrorMessage, Button } from "@chakra-ui/react";
function Testing() {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.txt}>
                <ReactQuill
                  placeholder="What's on your mind?"
                  theme="snow"
                  name="txt"
                  value={field.values}
                  onChange={field.onChange(field.name)}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default Testing;
