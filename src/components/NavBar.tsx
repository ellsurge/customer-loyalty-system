import { Box, Center, Container, HStack, Link, Text } from "@chakra-ui/react"


export default function NavBar(){
    return (
        <Box 
        bg="#160A01" 
        color="#ffffff"
        height="100%"
        p={4}
        >
         <HStack spacing="40%">
            <Text>Stuff</Text>
           <Center>
                <Link>home</Link>
                <Link></Link>
                <Link></Link>
                {/* {auth?`<Link>signup</Link>`:''} */}
           </Center>
           </HStack>

        </Box>
    )

}