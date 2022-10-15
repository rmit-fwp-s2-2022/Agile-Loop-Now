import {
    Box, 
    Heading,
    Avatar,
    Flex,
    Text,
    Button
  } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {loadUsersWithFollowers } from '../data/repository';


function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
          const userData = await loadUsersWithFollowers();
          setUsers(userData);
        }
        loadUsers();
      }, [setUsers]);

    function FollowButton({id}){
        return (
            <Box ml={140} pr={5}>
                {id ? 
                    <Button colorScheme='teal' variant='solid' textAlign={"center"}>Following</Button>:
                    <Button variant='outline'  textAlign={"center"}>Follow</Button>
                }
            </Box>
        )
    }


    return ( 
        <Box align={"center"} mt={15} minH={"75vh"}>
            <Heading color={"gray.500"}>Active Users</Heading>
            {users.map((user) => (
                <Box p={4} rounded={"lg"} borderWidth={1} maxW={"sm"} mt={5} mb={5}>
                    <Flex>
                        <Avatar bg="teal.500" size={"xl"} />
                        
                        <Box ml={4} mt={3} key={user.email}>
                            <Heading p={1} size={"md"} textAlign={"left"}> {user.name}</Heading>
                            <Text pl={1} textAlign={"left"}> {user.email}</Text>
                            <FollowButton id={''}/>
                        </Box>
                    </Flex>  
                </Box>
            ))}
        </Box>
     );
}

export default Users;