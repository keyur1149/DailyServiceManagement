import React, { useEffect, useState } from 'react'
import Notmilkchild from '../notmilkchild/Notmilkchild';
export default function Notmilk() {
    const [users,setusers]=useState([]);
  const notmilk=async ()=>{
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    var showdate=new Date();
    var todaydate=showdate.getDate();
    console.log(todaydate);
    var month=showdate.getMonth()+1;
    var year=showdate.getFullYear();
    const provider_id=user.milk_provider_id;
    const res=await fetch("/customernotmilk",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            provider_id,todaydate,month,year
        })
    });
    const y=await  res.json();
    console.log(y);
    setusers([...y]);
  }  
  useEffect(()=>{
    notmilk();
  },[]);
  const now=users.map((e,index)=>
    <Notmilkchild key={index}  value={e.customer_id}/>
  )
  return (
    <div>notmilk
        <div>{now}</div>
    </div>
  )
}
