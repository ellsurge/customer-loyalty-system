import {NavBar} from './NavBar';
import {Footer} from './Footer';

export const Layout = ({children})=>{

    return(
        <Grid 
            templateAreas={`"navbar" "body" "footer"`}
            gridTemplateRows={'200px 1fr 150px'}
            h = '100vh'
        >
            <GridItem bg="red" area="navbar">{NavBar}</GridItem>
            <GridItem bg="red" area="body">{children}</GridItem>
            <GridItem bg="red" area="footer">{Footer}</GridItem>
            <
        </Grid>

    )
}