import Structure from "@/components/Structure";
import { Button, Flex, FormControl, HStack, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Spacer, Table, TableContainer, Tbody, Td, Th, Text, Thead, Tr, VStack, useDisclosure } from "@chakra-ui/react";
import { colors } from "@/pages/_app";
import { CatAddSchema, OrderAddSchema } from "@/utils/dto";
import { api } from "@/utils/api";
import { z } from "zod";
import { UseFormProps, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Item } from "@prisma/client";

interface CatFormData {
  name: string;
  point: number;
}
interface ItThingie{
    price: number;
    category: {
        point:number
    }
}
interface OrderFormData {
  userId: string;
  itemId: string;
  quantity: number;
  price: number;
  point: number;
  cashierId: string;
}

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
  const dis2 = useDisclosure();
  const users = api.users.getAll.useQuery();
  const mutation = api.orders.addCat.useMutation();
  const mutation2 = api.orders.create.useMutation();
  const i = api.items.find.useMutation();
  const cats = api.orders.getCat.useQuery();
  const items = api.items.getAll.useQuery();
  const orders = api.orders.getAll.useQuery();
  const cashId = 'clij66pa4000nj20mq4573fk6';

  const methods = useZodForm({
    schema: CatAddSchema,
  });

  const method2 = useZodForm({
    schema: OrderAddSchema,
    defaultValues: {
      cashierId: 'clij66pa4000nj20mq4573fk6',
      price: 0,
      point: 0,
    }
  });

  let catlist: JSX.Element[] | undefined = undefined;
  let userList: JSX.Element[] | undefined = undefined;
  let itemList: JSX.Element[] | undefined = undefined;
  let orderList: JSX.Element[] | undefined = undefined;

  if (!cats.isLoading) {
    catlist = cats.data?.map((cat) => (
      <ListItem key={cat.id}>{cat.name} : {cat.point}</ListItem>
    ));
  }

  if (!users.isLoading) {
    userList = users.data?.map((usr) => (
      <option key={usr.id} value={usr.id}>{usr.name}</option>
    ));
  }

  if (!items.isLoading) {
    itemList = items.data?.map((item) => (
      <option key={item.id} value={item.id}>{item.name}</option>
    ));
  }

  if (!orders.isLoading) {
    orderList = orders.data?.map((order) => (
      <Tr key={order.id}>
        <Td>{order.id}</Td>
        <Td>{order.item?.name}</Td>
        <Td>{order.quantity}</Td>
        <Td>{order.doc?.toLocaleDateString()}</Td>
        <Td>{order.total}</Td>
        <Td>{order.status?.toString()}</Td>
      </Tr>
    ));
  }

  return (
    <Structure>
      <Flex>
        <Button onClick={dis1.onOpen} bg={colors.dark} m={5} color="white">add category</Button>
        <Spacer />
        <Button onClick={dis2.onOpen} bg={colors.dark} m={5} color="white">create Order</Button>
      </Flex>

      <Modal isOpen={dis1.isOpen} onClose={dis1.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={methods.handleSubmit(async (values: CatFormData) => {
              console.log(values);
              await mutation.mutateAsync(values);
              cats.refetch();
              methods.reset();
            })}>
              <Input type="text" {...methods.register('name')} placeholder="name" />
              <Input
                type="number"
                {...methods.register('point', { valueAsNumber: true })}
                placeholder="points"
              />
              <FormControl>
                <Button type="submit" bg={colors.dark} px={10} color="white">
                  Add
                </Button>
              </FormControl>
            </form>
            <List>
              {catlist}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={dis2.isOpen} onClose={dis2.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={method2.handleSubmit(async (values: OrderFormData) => {
                const it: Item & { category: { point: number | null } } | null = await i.mutateAsync({ id: values.itemId });
                if (it && it.category && it.category.point !== null) {
                values.price = it.price;
                values.point = it.category.point;
                values.cashierId = 'clij66pa4000nj20mq4573fk6'
                await mutation2.mutateAsync(values);
                cats.refetch();
                methods.reset();
                }

            })}>
              <FormControl>
                <Select {...method2.register('userId')}>
                  {userList}
                </Select>
                <Select {...method2.register('itemId')}>
                  {itemList}
                </Select>
                <Input
                  type="number"
                  {...method2.register('quantity', { valueAsNumber: true })}
                  placeholder="amount"
                />
              </FormControl>
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

      <TableContainer mx={10} p={5}>
        <Table variant={'striped'}>
          <Thead>
            <Tr>
              <Th>Order Id</Th>
              <Th>Products</Th>
              <Th>Quantity</Th>
              <Th>Date</Th>
              <Th>Total</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderList}
          </Tbody>
        </Table>
      </TableContainer>
    </Structure>
  );
}
