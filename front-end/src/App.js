import './App.css';
import SignUp from './components/signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AddProduct from './components/addProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>reWear</h1>
         <Routes>
           <Route path='/' element={<h1>Product List Page</h1>} />
           <Route path='/add-product' element={<AddProduct/>} />
           <Route path='/profile' element={<h1>Profile Page</h1>} />
           <Route path='/signup' element={<SignUp/>} />
           <Route path='/logout' element={<h1>Log Out Page</h1>} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
