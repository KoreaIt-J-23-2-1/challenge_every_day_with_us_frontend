import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/signup' element=<SignUp/> />
    </Routes>
  );
}

export default App;
