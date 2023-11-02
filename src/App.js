import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import PointStore from './pages/PointStore/PointStore';

function App() {
  return (
    <Routes>
      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/signup' element={ <SignUp/> } />
      <Route path='/point' element={ <PointStore /> } />
    </Routes>
  );
}

export default App;
