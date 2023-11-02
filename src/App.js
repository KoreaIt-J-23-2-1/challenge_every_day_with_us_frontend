import { Route, Routes } from 'react-router-dom';
import './App.css';
import MyPage from './pages/MyPage/MyPage';
import MyPageDetails from './pages/MyPage/MyPageDetails';

function App() {
  return (
    <Routes>
      <Route path='/account/mypage' element={ <MyPage /> } />
      <Route path='/account/mypage/details' element={ <MyPageDetails /> } />
    </Routes>
  );
}

export default App;
