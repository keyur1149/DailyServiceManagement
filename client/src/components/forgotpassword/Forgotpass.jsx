import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Forgotpass() {
    const navigate = useNavigate();
    const [email,setemail]=useState();
    const [error,seterror]=useState();
    const handlechange=(e)=>{
        setemail(e.target.value);
    }
    const forgotpassword=async()=>{
        const otp=Math.floor(100000 + Math.random() * 900000)
        const res=await fetch("/forgotpassword",{
            method:"Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,otp
            }),
        });
        const y=await res.json();
        seterror(y.msg);
        navigate("/otp",{state: {forgot:otp,email:email}});
    };  
  return (<div>
    <div>
       Email :-  <input type="email" name="email" value={email} onChange={handlechange}/>
    </div>
    <div><button onClick={forgotpassword}>forgot</button></div>
    <div>
   {error}
 </div>
 </div>
  )
}
