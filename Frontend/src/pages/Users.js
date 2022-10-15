import {
    Box, 
    Heading,
    Avatar,
    Flex,
    Text,
    Button
  } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {loadUsersWithFollowers, isFollowing, createFollow } from '../data/repository';


function Users(props) {
    const [users, setUsers] = useState([]);
    console.log(props.user.email);
    useEffect(() => {
        async function loadUsers() {
          const userData = await loadUsersWithFollowers();
          console.log(await isFollowing("test@mail.com", "asd@asd.com"))
        //   await createFollow({user_email: props.user.email, follower_email: "mail@m.com"})
          setUsers(userData);
        }
        loadUsers();
      }, [setUsers]);

    function FollowButton({id}){
        console.log(id);
        return (
            <Box ml={140} pr={5}>
                {id === props.user.email ? 
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
                <Box p={4} rounded={"lg"} borderWidth={1} maxW={"sm"} mt={5} mb={5} key={user.email}>
                    <Flex>
                        <Avatar bg="teal.500" size={"xl"} />
                        <Box ml={4} mt={3}>
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