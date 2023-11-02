import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';

function App() {
  return (
    <Routes>
      <Route path='/account/*' element={ <AccountRoute /> } />
    </Routes>
  );
}

export default App;
