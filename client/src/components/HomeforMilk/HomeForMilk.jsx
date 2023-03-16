import React from 'react';
import './style.css';

export default function HomeForMilk() {
  const handlelogout=async()=>{
    localStorage.removeItem("user")
    window.location.href="/";
  }
  return (
    <div className="home-milk-container">
      <button onClick={handlelogout}>Log Out</button>
      <header className='home-header'>
        <h1>Distributor Dashboard</h1>
      </header>
      <br/>
      <br/>
      <div className="link-container">
        <a href='/request' className="link">Request Milk Delivery</a>
        <br/>
        <br/>
        <a href='/todaynotdelivery' className="link">Report Milk Not Delivered</a>
        <br/>
        <br/>
        <a href='/milkupdate' className="link">Update Milk Delivery</a>
        <br/>
      </div>
    </div>
  )
}