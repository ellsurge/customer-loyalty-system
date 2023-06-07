import Structure from "@/components/Structure";
import { Button, Flex, FormControl, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { colors } from "@/pages/_app";
import { UsersAddSchema } from "@/utils/dto";
import { api } from "@/utils/api";
import { z } from "zod";
import {useForm, UseFormProps} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';



function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
){
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined)
  });
  return form;

}

export default function Add() {
  
  const mutation = api.userAuth.create.useMutation();
  const methods =useZodForm({
    schema: UsersAddSchema,
    defaultValues:{
      Role: "CASHIER"
    }
  });
  return (
    <Structure>
      <form onSubmit={methods.handleSubmit(async (values)=>{

        await mutation.mutateAsync(values);
        methods.reset();
        
      })}>
        <Flex p={10} justifyContent="space-between">
          <VStack w="35vw" spacing={4}>
            <FormControl>
              <Text fontWeight="black" fontSize="xl">
                Customer Data
              </Text>
            </FormControl>
              <Input
                
                placeholder="full Name"
                type="text"
                border="1px"
                borderRadius={0}
                borderColor={colors.dark}
                {...methods.register('name')}
              />

            <Input
              placeholder="Email"
              type="email"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...methods.register("email")}
            />
            <Input
              placeholder="Password"
              type="password"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...methods.register("password")}
            />
            <FormControl>
              <Button type="submit" bg={colors.dark} px={10} color="white">
                Save
              </Button>
            </FormControl>
          </VStack>
          <VStack w="35vw" spacing={4}>
            <FormControl>
              <Text fontWeight="black" fontSize="xl">
                Shipping Address
              </Text>
            </FormControl>
            <Input
              type="text"
              placeholder="Country"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...methods.register("country")}
            />
            <Input
              type="text"
              placeholder="Province"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...methods.register("province")}
            />
            <Input
              type="text"
              placeholder="Address"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...methods.register("address")}
            />
          </VStack>
        </Flex>
      </form>
    </Structure>
  );
}
