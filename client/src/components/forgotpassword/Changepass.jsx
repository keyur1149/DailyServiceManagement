import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
export default function Changepass() {
  const location = useLocation();
    const [password,setpassword]=useState();
    const handlechange=(e)=>{
        // console.log("keyur");
        setpassword(e.target.value);
        console.log(password);
    };
    const changepass=async(e)=>{
      const email=location.state.email;
        e.preventDefault();
        const res=await fetch("/changepassword",{
          method:"Post",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email,password
          }),
      });
      const y=await res.json();
      console.log(y);
    }
    return (
        <div>
        <Form>
        
         <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="50">
          <Form.Control type="password" onChange={handlechange}  />
        </Col>
      </Form.Group>
      </Form>
      <Button variant="primary" onClick={changepass} type="submit">
        Submit
      </Button>
    </div>
  )
}
