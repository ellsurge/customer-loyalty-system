import Structure from "@/components/Structure";
import { Button, Flex, FormControl, HStack, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Spacer, Table, TableCaption, Tbody, Text, Th, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { colors } from "@/pages/_app";
import { CatAddSchema, ItemAddSchema} from "@/utils/dto";
import { api } from "@/utils/api";
import { z } from "zod";
import {useForm, UseFormProps} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';



function useZodForm<TSchema extends z.ZodType>(props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  }) {
    const { schema, ...rest } = props;
    const form = useForm<TSchema['_input']>({
      ...rest,
      resolver: zodResolver(schema),
    });
  
    return form;
  }
export default function Add() {
  const dis1 = useDisclosure();
  const mutation = api.items.create.useMutation();
  const cats = api.orders.getCat.useQuery();
  const items = api.items.create.useMutation();
  const itemArr = api.items.getAll.useQuery();
  const methods =useZodForm({
    schema: ItemAddSchema,
  });

  let catlist = null;
  let userList = null;
  let itemList = null;

  if(!cats.isLoading){
    catlist = cats.data?.map((cat)=>(
        <option key={cat.id} value={cat.id}>{cat.name} </option>
    ))
  }
  if(!itemArr.isLoading){
    itemList =itemArr.data?.map((item)=>(
      <Tr key={item.id} >
          <Th>{item.id}</Th>
          <Th>{item.name}</Th>
          <Th>{item.price}</Th>
          <Th>
          {item.category.name}
          </Th>
          <Th>
          {item.transaction.map((trans)=>(
            <> {trans.userId}</>
          ))}
          </Th>
      </Tr>
  ))
  }
  return (
    <Structure>
        <Flex>
            <Button onClick={dis1.onOpen} bg={colors.dark} m={5} color="white"> add product</Button>
            <Spacer/>
        </Flex>
        <Modal isOpen={dis1.isOpen} onClose={dis1.onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>
                    <ModalCloseButton/>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={methods.handleSubmit(async (values)=>{
                        console.log(values)
                        await mutation.mutateAsync(values);
                        cats.refetch();
                        methods.reset();
                        
                    })} >
                        <Input type="text" {...methods.register('name')} placeholder="name"></Input>
                        <Select {...methods.register('catId')} placeholder="category">
                            {catlist}
                        </Select>
                        <Input 
                        type="number" 
                        {...methods.register('price', {valueAsNumber: true, })} 
                        placeholder="price"></Input>
                        <FormControl>
                            <Button type="submit" bg={colors.dark} px={10} color="white">
                                Add
                            </Button>
                        </FormControl>

                    </form>
                    <List>
                    </List>
                </ModalBody>
            </ModalContent>
        </Modal>
        <Table variant={'striped'}>
        <TableCaption>all</TableCaption> 
          <Thead>
                <Tr>
                    <Th>id</Th>
                    <Th>name</Th>
                    <Th>price</Th>
                    <Th>category</Th>
                    <Th>owner</Th>
                </Tr>
          </Thead>
          <Tbody>
              {itemList}
          </Tbody>
        </Table>
    </Structure>
  );
}
