import { Grid, GridItem } from "@chakra-ui/react"
import Footer from "./Footer"
import Nav from "./Nav"
import { Header } from "./Header"


interface StructureProp{
    children: React.ReactNode
}

export default function Structure({children}:StructureProp){
    return(
        <Grid
        templateAreas={`"nav header " "nav body" "footer footer"`}
        gridTemplateRows={'80px 1fr 30px'}
        gridTemplateColumns={'250px 1fr'}
        h="100vh"
        gap={1}
        >
            <GridItem area={'header'}>
                <Header/>
            </GridItem>

            <GridItem area={'nav'}>
                <Nav/>
            </GridItem>

            <GridItem area={'body'}>
                {children}
            </GridItem>
            <GridItem area={'footer'}>
                <Footer/>
            </GridItem>
        </Grid>
    )
}