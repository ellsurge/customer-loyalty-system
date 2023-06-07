import Layout from "@/components/Layout"
import { Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from "@chakra-ui/react"
import { colors } from "../_app";
import { api } from "@/utils/api";
import { LoginReqSchema } from "@/utils/dto";
import {z} from 'zod'


export default function Login(){
    const { onOpen, onClose}  = useDisclosure()
    const isOpen = true;
    async function loginAction(formData:FormData){
        try{
            const data = LoginReqSchema.parse(formData);
            const token = await api.auth.login.useQuery(data)
            console.log(token);

        }catch (error){
            if (error instanceof z.ZodError) {
                const formattedErrors = error.flatten();
                console.log(formattedErrors);
              } else {
                console.log(error);
              }

        }
    }
    return(

        <Layout>
            <Modal 
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            >
            <form action={loginAction}>
                {/* <ModalOverlay/> */}
                <ModalContent
                bg="#FFF4EC"
                p={2}
                border="2px"
                borderColor="#492912"
            
                >
                    <ModalHeader>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text
                        textAlign="center"
                        fontSize='2xl'
                        fontWeight="extrabold"
                        >
                        Welcome!

                        </Text>
                        <FormControl
                        paddingTop={3}
                        >
                            <FormLabel>please enter your details</FormLabel>
                            <Input 
                            type="text" 
                            placeholder="Email" 
                            borderColor={colors.outline}
                            borderRadius={0}
                            name="email"    
                            ></Input>
                        </FormControl>
                        <FormControl
                        paddingTop={6}

                        >
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            borderColor={colors.outline}
                            borderRadius={0}  
                            name="password"  
                            ></Input>
                        </FormControl>
                        <FormControl
                        fontSize='sm' 
                        paddingTop={3}

                        >
                            <Flex>
                                <Checkbox 
                                colorScheme={colors.outline}
                                name="rm"
                                >

                                    <Text 
                                    fontSize='sm' 
                                    >Remeber me?</Text></Checkbox>
                                <Spacer/>
                                <Link color={colors.link} href="./forgot-password">forgot password?</Link>
                            </Flex>
                        </FormControl>
                        <FormControl
                        paddingTop={5}
                        
                        >
                            <Center >
                            <Button type="submit" w="170px" borderRadius={12.5} alignSelf="center" bg={colors.dark} color="white">submit</Button>
                            </Center>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Text 
                        fontSize='sm' 
                        >Dont have an account? <Link fontWeight="bold" href="./signup">Sign up here for free</Link>
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </form>
            </Modal>
        </Layout>
    )
}