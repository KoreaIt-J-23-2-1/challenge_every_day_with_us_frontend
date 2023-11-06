import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import PointStore from './pages/PointStore/PointStore';
import SignIn from './pages/SignIn/SignIn';
import { useQuery } from 'react-query';
import { instance } from './api/config/instanse';
import NoticeList from './pages/NoticeList/NoticeList';
import NoticeWrite from './pages/NoticeWrite/NoticeWrite';
import ChallengeCreate from './pages/ChallengeCreate/ChallengeCreate';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Main from './pages/Main/Main';
import ChallengeDetails from './pages/ChallengeDetails/ChallengeDetails';
import SigninOauth2 from './pages/SignIn/SigninOauth2';


function App() {

  const getPrincipal = useQuery(["getPrincipal"], async () => {
    try{
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      }
      return await instance.get("/api/account/principal", option);

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
    <Routes>
      <Route path='/' element={<Main/>}/>

      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/point' element={ <PointStore /> } />
      <Route path='/auth/signup' element={ <SignUp/> } />
      <Route path='/auth/signin' element={<SignIn />} />
      <Route path='/auth/oauth2/login' element={<SigninOauth2 />} />
      
      <Route path='/notice' element={<NoticeList/>} />
      <Route path='/notice/write' element={<NoticeWrite/>} />

      <Route path='/challenge/create/:categoryName' element={<ChallengeCreate/>} />
      <Route path='/challenge/category' element={<CategoryPage/>} />
      <Route path='/challenge/:challengeId' element={<ChallengeDetails/>} />
    </Routes>
  );
}

export default App;