import { Box, Avatar } from "@chakra-ui/react";

function UserDisplay() {
    
    return ( 
        <Box>
            <Box pt={10} align={"center"}>
                <Avatar bg="teal.500" size={"md"} />
            </Box>
        </Box>
     );
}

export default UserDisplay;