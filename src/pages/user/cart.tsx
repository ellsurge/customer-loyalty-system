import styles from "./index.module.css";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import {Header} from "@/components/Header"
import NavBar from "@/components/NavBar";
import { Box, Button, Container, Flex, Grid, GridItem, HStack, Table, TableCaption, Tbody, Text, Th, Td, Thead, Tr, VStack, FormControl, Checkbox, Tfoot, Input, Spacer, TableContainer, InputRightAddon, InputRightElement, InputGroup } from "@chakra-ui/react";
import { colors } from '../_app';
import { Form } from "react-hook-form";
import Layout from "@/components/Layout";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const uid = 'clij5whpt0000j20mvuqksnc6'
  const data = null;
  const user  =  api.users.fetch.useQuery({id:uid})
  const cart = api.orders.getCart.useQuery({id:uid})
  const citm = api.orders.cancel.useMutation()

  const [cartItems, setCartItems] = useState([]);
  const [cartList, setListItems] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [numItem, setItemNum] = useState(0);
  const [discount, setDiscount]=  useState(0);
  const [iv, setIv]=  useState(false);
  const [points, setPoints]=  useState(0);
  const [upt, setUpt]=  useState(0);
  const [amount, setAmount]=  useState(0);
    // setCartItems(cart)\

    useEffect(()=>{
        if(!user.isLoading && user.isSuccess){
            console.log('getting user...')
            setPoints(user.data.points)
        }

    },[user] )
    useEffect(()=>{
        if(!cart.isLoading && cart.isSuccess){
            console.log('updating cart...')
            setCartItems(cart.data);
            setItemNum(cartItems.length);
        }
    }, [cart]);
  useEffect(()=>{
    calculateSubtotal();
    calculateGrandTotal();
  }, [cartItems])
  useEffect(()=>{
    calculateAmmount()
  }, [grandTotal, upt])
  
  useEffect(()=>{
    const cl = cartItems.map((c)=>(
        <Box as="tr" key={c.id} m={10}>
            <Td fontWeight={'bold'}>{c.item.name}</Td>
            <Td fontWeight={'bold'}>{c.quantity}</Td>
            <Td>${c.total}</Td>
            <Td> <Button onClick={() =>remove(c.id)} variant={'ghost'} size={'sm'}><DeleteIcon></DeleteIcon> remove</Button></Td>
        </Box>
    ))
    setListItems(cl)
  }, [cartItems])
  useEffect(()=>{
        calculateGrandTotal();
  }, [discount, subtotal])
  let insiderForm = null
  if (iv) {
    insiderForm = (
      <HStack>
        <Box w={'100%'}>
            <Input 
              border={'1px'} 
              borderColor={colors.dark} 
              borderRadius={'0'} 
              placeholder="amount of points to use"
              onChange={(e)=>checkPoints(e.target.value)}
            />
        </Box>
      </HStack>
    );
  }
  
  const remove = async (id)=>{
    console.log('removing---',id)
    citm.mutateAsync({id:id})
    cart.refetch()
    calculateSubtotal();

    

  }
  const calculateAmmount = ()=>{
    if(upt >0){
        setAmount(grandTotal-upt)
    }else{
        setAmount(grandTotal)
    }

  }
  const calculateSubtotal = ()=>{

    const totalSum = cartItems.reduce((sum, i)=> sum +i.total, 0);
    setSubtotal(totalSum);

  }
  const calculateGrandTotal = ()=>{
    let d = 0
    if(discount>0){
         d = subtotal *(discount/100);
    }
    const grandTotal = subtotal - d;
    setGrandTotal(grandTotal);
    
  }
  const handleCheckboxChange = () => {
    setIv(!iv);
  };
  const checkPoints = (pt)=>{
    if(pt<points){
        setUpt(pt)
        calculateAmmount()
    }

  }


  return (
    <Layout>
            <Text p={5} textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'}> Your Cart</Text>
        <Flex justifyContent={'space-around'} px={10} mx={10}>
            <TableContainer>
                <Table w={'50vw'} size={'sm'}>
                    <Thead>
                        <Th>item summary ({numItem})</Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>

                    </Thead>
                    <Tbody>
                        {cartList}
                    </Tbody>
                </Table>
            </TableContainer>

                <Box w={'24vw'}  fontSize={'sm'}  >

                    <VStack border={'1px'} spacing={5} p={5} textAlign={'left'}>
                        <HStack >
                            <Text  fontWeight={'bold'}>Subtotal</Text>
                            <Text>${subtotal}</Text>
                        </HStack>
                        <HStack>
                        <Text  fontWeight={'bold'} >Shippiing</Text>
                            <Text>{'calculated at next step'}</Text>
                        </HStack>
                        <HStack>
                        <Text  fontWeight={'bold'} >Coupon Code:</Text>
                        </HStack>
                        <HStack>
                            <Box  w={'100%'}>
                            <InputGroup  >
                                <Input 
                                border={'1px'} 
                                borderColor={colors.dark} 
                                borderRadius={'0'} 
                                placeholder="Enter Your Caption"
                                onChange={(e)=>setDiscount(parseFloat(e.target.value))}
                                ></Input>
                                <InputRightElement 
                                bg={colors.dark} 
                                color={'white'} 
                                onClick={calculateGrandTotal}
                                >
                                    <ArrowForwardIcon> </ArrowForwardIcon>
                                </InputRightElement >
                            </InputGroup>
                            </Box>

                        </HStack>
                        <HStack>
                            <Text  fontWeight={'bold'}>Discount</Text>
                            <Text color={'green.300'}>-{discount}%</Text>
                        </HStack>
                        <HStack>
                        <Text   fontWeight={'bold'}>Grand Total:</Text>
                            <Text>{grandTotal}</Text>
                        </HStack>    
                        <HStack>
                            <Text >
                                <FormControl>
                                <Checkbox isChecked={iv} onChange={handleCheckboxChange}>Use insider account</Checkbox>
                            </FormControl >
                            </Text>
                        </HStack>
                        {insiderForm}
                        <HStack>
                        <Text  fontWeight={'bold'}>Amount left to pay:</Text>
                            <Text>{amount}</Text>
                        </HStack>                      
                        <HStack>
                        <Text  fontWeight={'bold'}>Points earned:</Text>
                            <Text>{points}</Text>
                        </HStack>
                        <Box >
                    </Box>      
                    <Button w={'100%'} borderRadius={0} bg={colors.dark} color={'white'}>checkbox</Button>

                    </VStack>

                </Box>
        </Flex>

      
    </Layout>
  );
};

export default Home;


