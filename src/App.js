import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountRoute from './components/Routes/AccountRoute';
import SignUp from './pages/SignUp/SignUp';
import PointStore from './pages/PointStore/PointStore';
import SignIn from './pages/SignIn/SignIn';
import { useQuery } from 'react-query';
import { instance } from './api/config/instanse';

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
      <Route path='/account/*' element={ <AccountRoute /> } />
      <Route path='/point' element={ <PointStore /> } />
      <Route path='/auth/signup' element={ <SignUp/> } />
      <Route path='/auth/signin' element={<SignIn/>}/>
    </Routes>
  );
}

export default App;
