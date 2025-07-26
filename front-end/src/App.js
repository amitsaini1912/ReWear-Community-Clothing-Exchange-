import './App.css';
import SignUp from './components/signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AddProduct from './components/addProduct';
import PrivateComponent from './components/privateComponent';
import Login from './components/login';

import DeleteButton from './components/deleteBotton';
import ViewProduct from './components/viewProduct';
import LandingPage from './components/landingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>

            <Route path='/' element={<LandingPage/>} />

           <Route element={<PrivateComponent/>} >
              <Route path='/add-product' element={<AddProduct/>} />
              <Route path='/profile' element={<h1>Profile Page</h1>} />
            
              <Route path='/logout' element={<h1>Log Out Page</h1>} />
           </Route>

           <Route path='/signup' element={<SignUp/>} />
           <Route path='/login' element={<Login/>} />

           <Route path='/item/delele/:id' element={ <DeleteButton/>}/>
           <Route path='/item/:id' element={<ViewProduct/>}/>

         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
