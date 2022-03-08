import * as React from 'react';
import "./Admin.css";
import Message from '../../components/Message/Message';
import NavBar from '../../components/Navbar/Navbar'
import { useLocation } from 'react-router-dom';



export default function Admin() {

  
  const location = useLocation();
  let message = "";
  let type = "";

  if (location.state) {
    message = location.state.message;
    type = location.state.type;
  }


  return (
    <div>
      <NavBar/>      
      <h1>Admin</h1> 
      {message && <Message msg={message} type={type} />}    
    </div>
  );
}
