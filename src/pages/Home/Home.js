import * as React from 'react';
import "./Home.css";
import Message from '../../components/Message/Message';
import NavBar from '../../components/Navbar/Navbar'
import { useLocation } from 'react-router-dom';
import Logo from '../Login/logo.png';

export default function Home() {

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
      <img id="logo" src={Logo} alt="Logo"/>
      {message && <Message msg={message} type={type} />}    
    </div>
  );
}
