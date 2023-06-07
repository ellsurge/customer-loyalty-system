import Layout from "@/components/Layout";
import Structure from "@/components/Structure";
import { colors } from "@/pages/_app";
import { api } from "@/utils/api";
import { Search2Icon } from "@chakra-ui/icons";
import { HStack, InputGroup, Input, InputRightElement, Select, Flex, Box, Button, Spacer, TableContainer, TableCaption, Table, Thead, Tr, Th, Tbody, } from "@chakra-ui/react";
import Link from "next/link";


export default function view(){
    const users =  api.users.getAll.useQuery();
    if(users.data === undefined){
        return "loading ..."
    }
    console.log(users.data)
    return(
        <Structure>
            
            <HStack p={5} justifyContent={'space-between'}>
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
                
                <InputGroup w="10%">
                    <Select placeholder="order by">
                        <option > option 1</option>
                        <option > option 2</option>
                        <option > option 3</option>
                    </Select>
                </InputGroup>
            </HStack>
            <Flex>
                <Spacer/>
                <Button 
                href={'/add'} 
                as={Link} 
                bg={colors.dark} 
                color={'white'}
                mr={10}
                >Add Customer</Button>
            </Flex>
            <TableContainer>
                <Table>
                    <Thead>
                    <TableCaption>all</TableCaption>

                        <Tr>
                            <Th>Customer Name</Th>
                            <Th>Location</Th>
                            <Th>Order Amount</Th>
                            <Th>Amount Spent </Th>
                            <Th>Customer Id </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.data?.map((user)=>(
                            <Tr id={user.id}>
                                <Th>{user.name}</Th>
                                <Th>
                                {user.shipping.map((ship)=>(
                                    <> {ship.province}</>
                                ))}
                                </Th>
                                <Th>{user.transactions.length}</Th>
                                <Th>{user.transactions.map(obj=>obj['total']).reduce((acc, val)=>acc +val, 0)}</Th>
                                <Th>{user.id}</Th>


                            </Tr>
                        ))}

                    </Tbody>

                </Table>

            </TableContainer>
        </Structure>

    )
}