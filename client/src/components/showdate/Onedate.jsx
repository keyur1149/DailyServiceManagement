import React, { useEffect } from 'react'
// import {FaBeer} from 'react-icons/MdCancel'
import { AiOutlineCloseCircle } from "react-icons/ai";
export default function Onedate(props) {
  const dothis=async(e)=>{
    e.preventDefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const customer_id=user.user_id;
    const milkprovider_id=user.milkprovider_id;
    const date=props.value;
    const year=props.year;
    const month=props.month;
    const res = await fetch("/notdeliveryonthisdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,milkprovider_id,date,year,month
      })
    });
      const y=await res.json();
      // console.log("now work");
      props.onReRender();
      // console.log("working done");
  }
  const dothis1=async(e)=>{
    e.preventDefault();
    var user=localStorage.getItem("user");
    user=JSON.parse(user);
    const customer_id=user.user_id;
    const milkprovider_id=user.milkprovider_id;
    const date=props.value;
    const year=props.year;
    const month=props.month;
    const res = await fetch("/deletedate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,milkprovider_id,date,year,month
      })
    });
    const y=await res.json();
    props.onReRender();
  }
  const now=()=>{
    if(props.ischecked){
      return <button className="close-btn red" onClick={dothis} ><AiOutlineCloseCircle style={{display: "block",width: "90px",height: "45px"}}/></button>
    }else if(props.ischecked1){
      return <button className="close-btn blue" onClick={dothis1}><AiOutlineCloseCircle style={{display: "block",width: "90px",height: "45px"}}/></button>
    }else{
      return 
    }
  }
  return (
    <div className="onedate">
        <h1>{props.value}</h1>
        <div>{now()}</div>
    </div>
  )
}
