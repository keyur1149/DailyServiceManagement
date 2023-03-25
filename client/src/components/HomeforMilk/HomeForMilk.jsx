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
        <a href='/request' className="link">Request Of New Customers</a>
        <br/>
        <br/>
        <a href='/todaynotdelivery' className="link">Today's Delivery Status</a>
        <br/>
        <br/>
        <a href='/milkupdate' className="link">Update My Details</a>
        <br/>
      </div>
    </div>
  )
}