import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Movies from './pages/Movies';
import Favortitos from './pages/Favorites';

import Erro from './pages/Error';

function RoutesApp(){
    return(
        <BrowserRouter>
        
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/movies/:id' element={ <Movies/> } />
            <Route path='/favorites' element={ <Favortitos/> } />
            

            <Route path='*' element={ <Erro/> }/>
        </Routes>
        </BrowserRouter>

    )
}

export default RoutesApp;