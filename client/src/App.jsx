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
import Date from './components/Date/Date_Choose_milk'
import HomeForMilk from './components/HomeforMilk/HomeForMilk';
import Notmilk from './components/notdeloiverymilk/Notmilk';
import Milkproupdate from './components/milkupdate/Milkproupdate';
import Monthlycard from './components/monthlycard/Monthlycard';
import Newsregister from './components/newsregister/Newsregister';
import { useState } from 'react';
import NewsHome from './components/newshome/NewsHome';
import NewsUpdate from './components/newsupdate/NewsUpdate';
import Newsproviders from './components/newsproviders/Newsproviders';
import CusNewsrequest from './components/cusrequest/CusNewsrequest'
import NewsDelivery from './components/newsdelivery/Newsdelivery';
import Newscard from './components/monthlycard/Newscard';
import Date_Choose from './components/Date/Date_Choose_milk';
import Date_Choose_News from './components/Date/Date_Choose_News';
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
     <Route  path="/newsproviders" element={<Newsproviders/>} />
     <Route path="/profile" element={<CusUpadate/>}/>
     <Route path="/request" element={<Cusrequest/>}/>
     <Route path="/newsrequest" element={<CusNewsrequest/>}/>
     <Route path="/newsrequest" element={<CusNewsrequest/>}/>
     <Route path="/milkmanregister" element={<Milkproviders/>}/>
     <Route path="/customerregister" element={<Customer/>}/>
     <Route path="/newsregister" element={<Newsregister/>}/>
    <Route path="/date" element={<Date/>}/>
    <Route path="/datenews" element={<Date_Choose_News/>}/>
    <Route path="/milkhome" element={<HomeForMilk/>}/>
    <Route path="/newshome" element={<NewsHome/>}/>
    <Route path="/todaynotdelivery" element={<Notmilk/>}/>
  <Route path="/milkupdate" element={<Milkproupdate/>}/>
  <Route path="/newsupdate" element={<NewsUpdate/>}/>
  <Route path='/card' element={<Monthlycard/>}/>
  <Route path='/newscard' element={<Newscard/>}/>
  <Route path='/todaynotdeliverynews' element={<NewsDelivery/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    );
}

export default App;