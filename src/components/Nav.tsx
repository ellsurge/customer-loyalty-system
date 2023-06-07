import { colors } from "@/pages/_app";
import { Box, VStack, Text, List, ListItem, Stack, Link, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { InferGetStaticPropsType, GetStaticProps } from "next";

interface LinkItem {
  id: number;
  label: string;
  link: string;
  children?: LinkItem[];
}

const links: LinkItem[] =    [
    {
      id: 1,
      label: "home",
      link: "/",
    },
    {
      id: 10,
      label: "products",
      link: "/products",
    },  
    {
      id: 2,
      label: "orders",
      link: "/orders",

    },
    {
      id: 3,
      label: "customers",
      link: "/customers",
      children: [
        {
          id: 4,
          label: "manage",
          link: "/customers/manage",
        },
        {
          id: 5,
          label: "add new",
          link: "/customers/add",
        },
      ],
    },
  ];

  function NestedList({ items }: { items: LinkItem[] }) {
    return (
      <List>
        {items.map((item) => (
          <ListItem key={item.id} fontWeight="black" p={2} fontSize="xl">
            <Link as={NextLink} href={`/admin/${item.link}`}>
              {item.label}
            </Link>
            {item.children && (
              <Stack pl={6} mt={1} spacing={1}>
                <NestedList items={item.children} />
              </Stack>
            )}
          </ListItem>
        ))}
      </List>
    );
  }

export default function Nav() {
  if (!links ) {
    return <Text>"loading..."</Text>; // or return a loading state if desired
  }
  
  return (
    <VStack  border={'1px'} borderColor={colors.dark} >
      <Box w={"100%"} bg={colors.dark} color={"white"} textAlign={"center"} p={10}>
        <Text fontSize={"2xl"}>Loren</Text>
      </Box>
      <Box py={5}>
        <NestedList items={links} />
      </Box>
      <Spacer/>
      <Box py={10}><Link as={NextLink} href="/admin/settings" fontWeight={'black'} fontSize={'xl'}>Settings</Link></Box>
    </VStack>
  );
}



