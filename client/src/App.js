import React from 'react';
import {Container} from '@material-ui/core';
import NavBar from './components/Navbar/Navbar';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () =>{
    
    return (
        <BrowserRouter>
         <NavBar/>
         <Container maxWidth="lg">
            <Switch>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Container>
        </BrowserRouter>
    );
}

export default App