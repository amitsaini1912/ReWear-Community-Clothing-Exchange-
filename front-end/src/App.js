import './App.css';
import SignUp from './components/signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>reWear</h1>
         <Routes>
           <Route path='/signup' element={<SignUp/>} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
