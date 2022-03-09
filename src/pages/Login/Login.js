import * as React from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../../components/Message/Message";
import "./Login.css";
import Logo from './logo.png';



export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  let message = "";
  let type = "";

  if (location.state) {
    message = location.state.message;
    type = location.state.type;
  }

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = {
      email: email,
      senha: senha,
    };

    axios
      .post("auth", login)
      .then((response) => {
        localStorage.setItem("token", response.data.acessToken);
        localStorage.setItem("tipo", response.data.tipo);
        localStorage.setItem("idUser", response.data.idUser);
        navigate("/home", {
          state: { message: "Usuário logado com sucesso!", type: "success" },
        });
        document.location.reload(true);
      })
      .catch((response) => {
        navigate("/", {
          state: {
            message: "Dados incorretos, por favor tente novamente",
            type: "error",
          },
        });
        document.location.reload(true);
      });
  };


  return (
    <div id="divlogin">
      <img id="logo" src={Logo} alt="Logo"/>
      <h1>
        Login
      </h1>
      <form id='login' onSubmit={handleSubmit}>
     
          <input
            className='login'
            id="email"  
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          
          <input
            className='login'
            id="senha"            
            type="password"
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Senha"
            required
          />
        
        <a id="esqueceu" href="http://www.gogle.com"> Esqueceu sua senha?</a>
        <div id="divlogin">
          <button type="submit">Entrar</button>
        </div>
      </form>
      {message && <Message msg={message} type={type} />}
    </div>
  );
}
