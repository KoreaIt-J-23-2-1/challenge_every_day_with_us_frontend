import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import PointStore from './pages/PointStore/PointStore';
import SignIn from './pages/SignIn/SignIn';
import NoticeList from './pages/NoticeList/NoticeList';
import NoticeWrite from './pages/NoticeWrite/NoticeWrite';

function App() {
  return (
    <Routes>
      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/point' element={ <PointStore /> } />
      <Route path='/auth/signup' element={ <SignUp/> } />
      <Route path='/auth/signin' element={<SignIn />} />
      
      <Route path='/notice' element={<NoticeList/>} />
      <Route path='/notice/write' element={<NoticeWrite/>} />
    </Routes>
  );
}

export default App;
