import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

function App() {
  return (
    <Routes>
      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/auth/signup' element={ <SignUp/> } />
      <Route path='/auth/signin' element={<SignIn/>}/>
    </Routes>
  );
}

export default App;
