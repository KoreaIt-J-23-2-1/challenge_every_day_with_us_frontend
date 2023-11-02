import { Route, Routes } from 'react-router-dom';
import './App.css';
// import MyPage from './pages/MyPage/MyPage';
// import MyPageDetails from './pages/MyPage/MyPageDetails';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/signup' element=<SignUp/> />
{/* 
      <Route path='/account/mypage' element={ <MyPage /> } />
      <Route path='/account/mypage/details' element={ <MyPageDetails /> } /> */}
    </Routes>
  );
}

export default App;
