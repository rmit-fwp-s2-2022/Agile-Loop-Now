import {
    Box,
    Flex,
    Avatar,
    Heading,
    Textarea,
    Spacer,
    Text,
    Editable,
    EditablePreview,
    EditableTextarea,
  } from "@chakra-ui/react";

function Comment() {
    const post = {"user": "Me", "time": "Time here", "value":"soome random post"}
    return ( 
        <Box pt={20} minW='40%' >
            <Box >
                <Heading>My Comments</Heading>
            </Box>
            <Box p={4} rounded={"lg"} borderWidth={1} mt={3} >
                  <Flex>
                    <Box pt={2} pb={2}>
                      <Avatar bg="teal.500" size={"md"} />
                    </Box>
                    <Box p={3}>
                      <Heading size="sm">{post.user}</Heading>
                      <Text color={"gray.500"} fontSize={"xs"}>
                        {" "}
                        Posted On {post.time}
                      </Text>
                    </Box>
                  </Flex>

                <Editable
                    value= {post.value}
                    isPreviewFocusable={false}
                >
                    <EditablePreview />
                    <Textarea
                    name="txt"
                    as={EditableTextarea}
                    />
                    <Spacer />
                 
                </Editable>
    
            </Box>
        </Box>
     );
}

export default Comment;