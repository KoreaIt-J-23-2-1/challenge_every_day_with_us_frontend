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
import User from './components/MyPage/User';
import StampPage from './pages/StampPage/StampPage';

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
        {/* <Route path='/maain' element={<RealMain/>}/> */}
        <Route path='/main' element={<Main />} />
        <Route path='/' element={<LogoPage/>}/>
        
        <Route path='/account/*' element={ <AccountRoute /> } />
        <Route path='/auth/signup' element={ <SignUp/> } />
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/oauth2/login' element={<SigninOauth2 />} />
        
        <Route path='/store/items' element={<Store/>} />
        <Route path='/store/:userId/orders' element={<MyPageOrder/>} />
        <Route path='/user' element={<User/>} />

        <Route path='/notice/page/:page' element={<NoticeList/>} />
        <Route path='/notice/write' element={<NoticeWrite />} />
        <Route path="/notice/:noticeId" element={<NoticeDetails />} />
        <Route path="/notice/:noticeId/edit" element={<NoticeEdit />} />
        

        <Route path='/challenge/create/:categoryName' element={<ChallengeCreate/>} />
        <Route path='/challenge/category' element={<CategoryPage/>} />
        <Route path='/challenge/:challengeId' element={<ChallengeDetails/>} />

        <Route path='/challenges' element={<ChallengeList/>} />
        <Route path='/challenge/certification/:challengeId' element={<Certification/>} />

        <Route path='/challenge/feed' element={<Feed/>} />
        <Route path='/stamp' element={<StampPage/>} />
      </Routes>
    </>
  );
}

export default App;
