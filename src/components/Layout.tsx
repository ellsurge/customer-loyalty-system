import { Grid , GridItem} from '@chakra-ui/react';
import NavBar from './NavBar';
import Footer from './Footer';
// import React from 'react';

interface LayoutProps{
    children: React.ReactNode;
}
export default function Layout ({children}:LayoutProps){

    return(
        <Grid 
            templateAreas={`"navbar" "body" "footer"`}
            gridTemplateRows={'50px 1fr 25px'}
            h = '100vh'
        >
            <GridItem  area="navbar"><NavBar></NavBar></GridItem>
            <GridItem  area="body">{children}</GridItem>
            <GridItem  area="footer"><Footer/></GridItem>
            
        </Grid>

    )
}