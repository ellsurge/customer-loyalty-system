import { Box, Center, Container, HStack, Link, Text } from "@chakra-ui/react"

interface NavBarProp{
    auth :React.ReactNode
}

export default function NavBar({auth}:NavBarProp){
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
                {auth?`<Link>signup</Link>`:''}
           </Center>
           </HStack>

        </Box>
    )

}