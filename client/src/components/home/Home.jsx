import React from 'react'

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

  return (
    <>
    <div>
        <button onClick={next1}>Milk</button>
    </div>
    <div>
        <a href='/newsproviders'>News</a>
    </div>
    <div>
        <a href='/profile'>Update Profile</a>
    </div>
    
    <div>
        <a href='/date'>Choose Date </a>
    </div>
    </>
  )
}
