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

function Comment({name, time, content}) {
    const post = {"user": "Me", "time": "Time here", "value":"soome random post"}
    return ( 
        <Box>
            <Box p={4} rounded={"lg"} borderWidth={1} mt={3} >
                  <Flex>
                    <Box pt={2} pb={2}>
                      <Avatar bg="teal.500" size={"md"} />
                    </Box>
                    <Box p={3}>
                      <Heading size="sm">{name}</Heading>
                      <Text color={"gray.500"} fontSize={"xs"}>
                        {" "}
                        Posted On {time}
                      </Text>
                    </Box>
                  </Flex>

                <Editable pl={2}
                    value= {content}
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