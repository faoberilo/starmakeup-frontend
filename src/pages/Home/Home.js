import * as React from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../../components/Message/Message";
import "./Home.css";
import Logo from './logo.png';



export default function Home() {
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
        navigate("/admin", {
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
    <div>
      <img src={Logo} alt="Logo"/>
      <h1>
        Login
      </h1>
      <form onSubmit={handleSubmit}>
     
          <input
            id="email"  
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          
          <input
            id="senha"            
            type="password"
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Senha"
            required
          />
        
        <a href="http://www.gogle.com"> Esqueceu sua senha?</a>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
      {message && <Message msg={message} type={type} />}
    </div>
  );
}
