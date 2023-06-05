import React, { useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Allregistration() {
    const [usertype,setusertype]=useState();
    const [selectusertype,setselectusertype]=useState();
    const getusertype=async()=>{
        const res=await fetch("/usertype",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
        });
        const y=await res.json();
        setusertype(y);
    }
    useEffect(()=>{
        getusertype();
        setselectusertype(getusertype[0]);
    },[]);
    const usertypechange=async(e)=>{
        setselectusertype(e.target.value);
    };
  return (
    <div>

<Dropdown options={usertype} onChange={usertypechange} value={selectusertype} placeholder="Select an option" />
    </div>
  )
}
