import Structure from "@/components/Structure";
import { Button, Flex, FormControl, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { colors } from "@/pages/_app";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersAddSchema } from "@/utils/dto";
import { api } from "@/utils/api";

interface UserData {
  role: string;
  fname: string;
  lname: string;
  name: string;
  email: string;
  password: string;
  country: string;
  province: string;
  address: string;
}

export default function Add() {
  const { handleSubmit, register, formState: { errors } } = useForm<UserData>({
    defaultValues: {
      role: "USER",
      fname: "",
      lname: "",
      name: "",
      email: "",
      password: "",
      country: "",
      province: "",
      address: "",
    }
  });

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    data.role = "USER";
    data.name = `${data.fname} ${data.lname}`;

    const userData = UsersAddSchema.parse(data);
    console.log(userData);

    try {
      const { data: user } = await api.auth.create.useMutation(userData);
      console.log(user);
    } catch (error) {
      console.log("--------", error);
    }
  };

  return (
    <Structure>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex p={10} justifyContent="space-between">
          <VStack w="35vw" spacing={4}>
            <FormControl>
              <Text fontWeight="black" fontSize="xl">
                Customer Data
              </Text>
            </FormControl>
            <HStack spacing={4}>
              <Input
                placeholder="First Name"
                type="text"
                border="1px"
                borderRadius={0}
                borderColor={colors.dark}
                {...register("fname", { required: true })}
              />
              <Input
                placeholder="Role"
                type="text"
                border="1px"
                borderRadius={0}
                borderColor={colors.dark}
                {...register("role", { required: true })}
              />
              <Input
                placeholder="Last Name"
                type="text"
                border="1px"
                borderRadius={0}
                borderColor={colors.dark}
                {...register("lname", { required: true })}
              />
            </HStack>
            <Input
              placeholder="Email"
              type="email"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...register("email", { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...register("password", { required: true })}
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
              {...register("country", { required: true })}
            />
            <Input
              type="text"
              placeholder="Province"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...register("province", { required: true })}
            />
            <Input
              type="text"
              placeholder="Address"
              border="1px"
              borderRadius={0}
              borderColor={colors.dark}
              {...register("address", { required: true })}
            />
          </VStack>
        </Flex>
      </form>
    </Structure>
  );
}
