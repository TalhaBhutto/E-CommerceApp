import React from 'react';
import {Container} from '@material-ui/core';
import NavBar from './components/Navbar/Navbar';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/Home/Home';
const App = () =>{
    
    return (
        <BrowserRouter>
         <NavBar/>
         <Container fullWidth>
            <Switch>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Container>
        </BrowserRouter>
    );
}

export default App