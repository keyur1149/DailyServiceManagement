import React, { useEffect, useState } from 'react'

export default function Cusrequest() {
    const [requests,setrequest]=useState({
        h:[]
    });
    const [data,setdata]=useState([]);
    // const temp=<div>done</div>
    /*
    useEffect(async()=>{
        const temp=<div> done</div>;
        setrequests(temp);
    },[])
    */
    const now=async ()=>{
        var user=localStorage.getItem("user");
        user=JSON.parse(user);
        const customer_id=user.user_id;
        const res=await fetch("/customerandproviderlist",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id
            })
        });
        const y=await  res.json();
        
        // console.log(temp);
        // setdata(temp);
        setrequest({...requests,h:y});
        // setdata(y);
        // console.log(data);
        // console.log(requests)
    }
    useEffect(  ()=>{
        now();
        // setrequests(y);
        // const temp=y.map((element)=>{
        //     console.log(element);
        //     return (<div>{element}</div>)
        // });
        // setrequests(temp);
},[])
const temp=requests.h.map(async (element)=>{
    const pro=element.provider_id;
    const res=await fetch("/getusername",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pro
        })
    });
    const y=await res.json();
    console.log(y);
    return(
        <div>{y}</div>
    )
});
  return (
    <div>
        <div>all requests</div>
        {/* <div>{temp}</div> */}
        {/* <div>{requests.h}</div> */}
    </div>
  )
}
