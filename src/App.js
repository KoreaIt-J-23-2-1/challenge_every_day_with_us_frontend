import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import { useQuery } from 'react-query';
import { instance } from './api/config/instance';
import NoticeList from './pages/NoticeList/NoticeList';
import NoticeWrite from './pages/NoticeWrite/NoticeWrite';
import ChallengeCreate from './pages/ChallengeCreate/ChallengeCreate';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Main from './pages/Main/Main';
import ChallengeDetails from './pages/ChallengeDetails/ChallengeDetails';
import ChallengeList from './pages/ChallengeList/ChallengeList';
import SigninOauth2 from './pages/SignIn/SigninOauth2';
import LogoPage from './pages/LogoPage/LogoPage';
import Certification from './pages/Certification/Certification';
import Feed from './pages/Feed/Feed';
import NoticeDetails from './pages/NoticeDetails/NoticeDetails';
import { Global } from '@emotion/react';
import { Common } from "./styles/common";
import { SReset } from './styles/reset';
import Store from './components/Store/Store';
import NoticeEdit from './pages/NoticeEdit/NoticeEdit';
import MyPageOrder from './pages/MyPage/MyPageOrder/MyPageOrder';
import User from './components/MyPage/User/User';
import StampPage from './pages/StampPage/StampPage';
import RealMain from './pages/Main/RealMain';
import AuthRoute from './components/Routes/AuthRoute';
import MyPage from './pages/MyPage/MyPage';


function App() {
  const getPrincipal = useQuery(["getPrincipal"], async () => {
    try{
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      }
      return await instance.get("/api/auth/principal", option);
    }catch(error) {
      // throw new Error(error);
    }
  }, {
    retry: 0,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  });
  
  if(getPrincipal.isLoading){
    return <></>
  }

  return (
    <>

      <Global styles={SReset, Common}/>

      <Routes>
        <Route path='/main' element={<RealMain/>}/>
        <Route path='/maain' element={<Main />} />
        <Route path='/' element={<LogoPage/>}/>
        <Route path='/account/*' element={ <AuthRoute element={ <AccountRoute /> } /> } />
        <Route path='/auth/signup' element={ <SignUp/> } />
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/oauth2/login' element={<SigninOauth2 />} />
        <Route path='/notice/page/:page' element={<NoticeList/>} />
        <Route path='/challenges' element={<ChallengeList/>} />

        <Route path="/notice/:noticeId" element={<AuthRoute element={<NoticeDetails/>} /> } />
        <Route path="/user" element={<AuthRoute element={<User/>} /> } />
        <Route path='/store/items' element={<AuthRoute element={<Store/>} /> } />
        <Route path='/store/:userId/orders' element={<AuthRoute element={<MyPageOrder/>} /> } />
        <Route path='/mypage' element={<AuthRoute element={<MyPage/>} /> } />
        <Route path='/notice/write' element={<AuthRoute element={<NoticeWrite />} /> } />
        <Route path="/notice/:noticeId/edit" element={<AuthRoute element={<NoticeEdit />} /> } />
        <Route path='/challenge/create/:categoryName' element={<AuthRoute element={<ChallengeCreate/>} /> } />
        <Route path='/challenge/category' element={<AuthRoute element={<CategoryPage/>} /> } />
        <Route path='/challenge/:challengeId' element={<AuthRoute element={<ChallengeDetails/>} /> } />
        <Route path='/challenge/certification/:challengeId' element={<AuthRoute element={<Certification/>} /> } />
        <Route path='/challenge/feed' element={<AuthRoute element={<Feed/>} /> } />
        <Route path='/stamp' element={<AuthRoute element={<StampPage/>} /> } />
      </Routes>
      
    </>
  );
}

export default App;
