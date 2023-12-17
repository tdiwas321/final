import {Routes,Route,Link, BrowserRouter} from 'react-router-dom';
import './App.css';
import Admindashboard from './pages/Admindashboard';
import Adminbooking from './pages/Adminbooking';
import Addpartypalace from './pages/Addpartypalace';
import Adminpartypalace from './pages/Adminpartypalace';
import Bookpage from './pages/Bookpage';
import Contact from './pages/Contact';
import Home from './pages/Home'
import LogIn from './pages/LogIn';
import Maps from './pages/Maps';
import Profile from './pages/Profile';
import Services from './pages/Services';
import Signup from './pages/Singup';
import Userbooking from './pages/Userbooking'
import Userpassword from './pages/Userpassword'
import Updatepartypalace from './pages/Updatepartypalace';
import Updateuser from './pages/Updateuser';
import Myreviews from './pages/Myreviews';
import { Navigate } from 'react-router-dom';



export default function App() {

  function PublicElement({children}) {
    const userRole = localStorage.getItem('userRole');
  
    if (userRole === 'admin' || userRole === 'staff') {
      return <Navigate to='/admindashboard' replace />;
    } else {
      return <>{children}</>;
    }
  }


  function UserElement({children}){
    if(localStorage.getItem('userRole')==='user') {
      return<>{children}</>
    }else{
      return<>No Access to this page</>
    }
  }
  
  function AdminElement({children}){
    if(localStorage.getItem('userRole')==='admin'||localStorage.getItem('userRole')==='staff') {
      return<>{children}</>
    }else{
      return<>No Access to this page</>
    }
  }

  return (
    <Routes>
      {/* public elements routes*/}
        <Route path="/login" element={<PublicElement><LogIn/></PublicElement>} />
        <Route path='/' element={<PublicElement><Home/></PublicElement>}/>
        <Route path='/signup' element={<PublicElement><Signup/></PublicElement>}/>
        <Route path='/contact' element={<PublicElement><Contact/></PublicElement>}/>
        <Route path='/services' element={<PublicElement><Services/></PublicElement>}/>
        <Route path='/maps' element={<PublicElement><Maps/></PublicElement>}/> 
        <Route path='/details' element={<PublicElement><Bookpage/></PublicElement>}/>

      {/* user elements routes*/}
        <Route path='/userprofile' element={<UserElement><Profile/></UserElement>}/>
        <Route path='/userbooking' element={<UserElement><Userbooking/></UserElement>}/>
        <Route path='/userpassword' element={<UserElement><Userpassword/></UserElement>}/>
        <Route path='myreviews' element={<UserElement><Myreviews/></UserElement>}/>

        {/* admin elements routes */}
        <Route path='/admindashboard' element={<AdminElement><Admindashboard/></AdminElement>}/>
        <Route path='/adminbooking' element={<AdminElement><Adminbooking/></AdminElement>}/>
        <Route path='/adminpartypalace' element={<AdminElement><Adminpartypalace/></AdminElement>}/>
        <Route path='/addpartypalace' element={<AdminElement><Addpartypalace/></AdminElement>}/>
        <Route path='/updatepartypalace' element={<AdminElement><Updatepartypalace/></AdminElement>}/>
        <Route path='/updateuser' element={<AdminElement><Updateuser/></AdminElement>}/>
        
        <Route path='*' element={<div>Page Not Found</div>}/>
    </Routes>
  );
}

