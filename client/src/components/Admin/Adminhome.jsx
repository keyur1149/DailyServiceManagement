import React from 'react'

export default function adminhome() {
    const newsproviders=()=>{
        window.location.href="/newsregister";
      }
      const milkproviders=()=>{
        window.location.href="/milkmanregister";
      }
    const handlelogout=async()=>{
        localStorage.removeItem("user")
        window.location.href="/";
      }
  return (
    <div className="home-container">
    <button type="button" class="btn btn-danger" onClick={handlelogout}>Log Out</button>
   
   <div className="button-container">
     <button className="button milk-button" onClick={milkproviders}>
     Add New MilkProvider 
     </button>
   </div>
   <div className="button-container">
     <button className="button news-button" onClick={newsproviders}>
     Add New NewsProvider
     </button>
   </div>
 </div>
  )
}
