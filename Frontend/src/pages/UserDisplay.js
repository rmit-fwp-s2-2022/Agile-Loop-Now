import { Box, Avatar, Heading, Text, Link } from "@chakra-ui/react";

function UserDisplay({name, email}) {
    const user = {"name": "New user", "email": "mail@mail.com"}
    return ( 
        <Box align={"center"}>
            <Box pt={3} align={"center"}>
                <Avatar bg="teal.500" size={"md"} />
            </Box>
            <Box p={3}>
                <Link>
                <Heading size="sm">{name}</Heading>
                <Text color={"gray.500"} fontSize={"xs"}>
                {" "}
                {email}
                </Text>
                </Link>
            </Box>
        </Box>
     );
}

export default UserDisplay;