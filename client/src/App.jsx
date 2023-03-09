import logo from './logo.svg';
import{Route,Routes,Navigate,BrowserRouter} from 'react-router-dom';

import './App.css';
import Milk from './components/milkprovider/Milk';
import News from './components/newsprovider/News';
import Customer from './components/Customer/Customer';
import Cuslogin from './components/cuslogin/Cuslogin';
import Milkproviders from './components/milkproviders/Milkproviders';
import Home from './components/home/Home';
import CusUpadate from './components/cusupdate/CusUpadate'
import Cusrequest from './components/cusrequest/Cusrequest';
import Date from './components/Date/Date_Choose'
import HomeForMilk from './components/HomeforMilk/HomeForMilk';
import Notmilk from './components/notdeloiverymilk/Notmilk';
function App() {
    return ( 
    <div class= "App" >
        {/* <Cuslogin/> */}
        {/* <Milk/> */}
        {/* <News/> */}
        {/* <Customer/> */}
        <BrowserRouter>
      <Routes>
      
      
  
     <Route  path="/" element={<Cuslogin/>} />
     <Route  path="/home" element={<Home/>} />
     <Route  path="/milkproviders" element={<Milkproviders/>} />
     <Route path="/profile" element={<CusUpadate/>}/>
     <Route path="/request" element={<Cusrequest/>}/>
     <Route path="/milkmanregister" element={<Milkproviders/>}/>
     <Route path="/customerregister" element={<Customer/>}/>
    <Route path="/date" element={<Date/>}/>
    <Route path="/milkhome" element={<HomeForMilk/>}/>
    <Route path="/todaynotdelivery" element={<Notmilk/>}/>
  
    </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;