import Layout from "@/components/Layout";
import { Container, Tab, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export default function SignUP(){
    return(
        <Layout>
            <Container>
                <Tabs
                defaultIndex={1}
                >
                    <TabPanels>
                        <TabPanel>
                            part 1
                        </TabPanel>
                        <TabPanel>
                            part 2
                        </TabPanel>
                    </TabPanels>


                </Tabs>
            </Container>
        </Layout>
    )

}