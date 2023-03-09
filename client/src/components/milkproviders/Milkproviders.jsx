import React, { useEffect, useState } from 'react'

export default function Milkproviders() {
  const [milkman,setmilkman]=useState();
  const [milk,setmilk]=useState();
  const [ans,setans]=useState();
  const now1=async  ()=>{
    // e.preventDefault();  
      const res =await fetch("/milkman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    // console.log(res);
    const y =await  res.json();
    console.log(y);
    const now=y.map((element)=>{
      return (
          <option value={element.milk_provider_id}>{element.username} {element.prize}</option>
      )
    })
    console.log(now);
    setmilkman(now);
}
const changedon=(e)=>{
  console.log(e.target.value);
  const n=e.target.value;
  setmilk(n);
}
useEffect(()=>{
  now1();
  // console.log(milk);
}
  ,[]);
const sendrequest=async (e)=>{
  var user=localStorage.getItem("user");
  user=JSON.parse(user);
    // console.log(user)
  const user_id=user.user_id;
  console.log(user_id);
  console.log(milk);
  const res=await fetch('/sendrequest',{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      milk,user_id
    }),
  });
  const y=await res.json();
  setans(y);
}
  return (
    <div>
      {/* <button onClick={now1}>click</button> */}
      <select onChange={changedon} name="milk" value={milk}>{milkman}</select>
      <button onClick={sendrequest}>Submit</button>
      <div>
        <p>{ans}</p>
        <p>{milk}</p>
      </div>
    </div>
  )
}
