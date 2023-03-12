import React from 'react'
import "./home.css"
export default function Home() {
  const next1=async (e)=>{
    // e.preventdefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const user_id=user.user_id;
    console.log(user_id);
    const res=await fetch('/milkproviderpresent',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id
      }),
    });
    // console.log(res);
    const y=await res.json();
    console.log(y);
    if(y=="not"){
      window.location.href='/milkproviders';
    }else{
      window.location.href="/card"
    }
  }
  const newsproviders=()=>{
    window.location.href="/newsproviders";
  }
  const profile=()=>{
    window.location.href="/profile";
  }
  const date=()=>{
    window.location.href="/date";
  }

  return (
    <div className="home-container">
    <header>
      <h1>Welcome to Our Site</h1>
      <p>Find the best milk and news providers in your area</p>
      <p>Stay up-to-date on local events and happenings</p>
      <p>Connect with your community and neighbors</p>
    </header>
    <div className="button-container">
      <button className="button milk-button" onClick={next1}>
        Find Milk Providers
      </button>
    </div>
    <div className="button-container">
      <button className="button news-button" onClick={newsproviders}>
        Find News Providers
      </button>
    </div>
    <div className="button-container">
      <button className="button profile-button" onClick={profile}>
        Update Profile
      </button>
    </div>
    <div className="button-container">
      <button className="button date-button" onClick={date}>
        Choose a Date
      </button>
    </div>
   </div>

  )
}
