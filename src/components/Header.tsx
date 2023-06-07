import { colors } from "@/pages/_app";
import GetRoute from "@/utils/helper";
import { Search2Icon } from "@chakra-ui/icons";
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Input, InputGroup, InputRightAddon, InputRightElement, Spacer, Stack, VStack,} from "@chakra-ui/react";
import {signIn, signOut, useSession} from "next-auth/react"
import Link from "next/link";

export const Header =() =>{
    const {data: sessionData} = useSession();
    const currenrtUrl = GetRoute;
    // console.log(currenrtUrl());


    return (
        <Box
        mx={10}
        borderBottom={'1px'}
        borderBottomColor={colors.dark}
        >
        <Flex p={3} > 
            <InputGroup w={'50%'}>
                <Input 
                type="search" 
                placeholder="Search..." 
                border={'1px'} 
                borderColor={colors.dark}
                borderRadius={10}></Input>
                <InputRightElement pointerEvents='none'>
                    <Search2Icon/>
                </InputRightElement>
            </InputGroup>
            <Spacer/>
            <Avatar 
            bg={colors.dark} 
            name={sessionData?.user?.name ? `notes for ${sessionData.user.name}` : ""}
            size={'sm'}
            ></Avatar>
        </Flex>
        <Breadcrumb>
            {currenrtUrl().map((item)=>(
                <BreadcrumbItem key={item.path}>
                    <BreadcrumbLink href={`/${item.path}`} as={Link}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}

        </Breadcrumb>
        </Box>


    )
}