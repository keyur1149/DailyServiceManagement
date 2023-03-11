import React, { useEffect, useState } from 'react'
import Req from '../req/Req'

export default function Cusrequest() {
    const [requests,setrequest]=useState([]);
    const now=async ()=>{
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        const provider_id=user.milk_provider_id;
        const res=await fetch("/customerandproviderlist",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                provider_id
            })
        });
        const y=await  res.json();
        setrequest([...requests,...y]);
        // console.log(y[0].username);
    }
    useEffect(()=>{
        now();
    },[])
    const print=requests.map((e,index)=>
            // <div key={index} value={e.customer_id}>{e.customer_id}<br/>{e.provider_id}</div>
<Req key={index} value={e.customer_id}/>
            )
  return (
    <div>
        {
            print
        }
    </div>
  )
}
