import React from "react";
import { BiLogOutCircle} from "react-icons/bi";
import { Ul } from "./styles";
import ModalCadastroProduto from '../../components/ModalCadastroProduto/ModalCadastroProduto';
import { useNavigate } from "react-router-dom";
import ModalCadastroFornecedor from "../ModalCadastroFornecedor/ModalCadastroFornecedor";
import ModalVenda from "../ModalVenda/ModalVenda";




const RightNav = ({ open }) => { 
  const [isModalVisible, setisModalVisible] = React.useState(false);
  const [isModalVisible1, setisModalVisible1] = React.useState(false);
  const [isModalVisible2, setisModalVisible2] = React.useState(false);


  const navigate = useNavigate();

  const handleClick = event =>{
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    localStorage.removeItem('tipo');
    navigate("/", {
      state: {
        message: "Usuário deslogado",
        type: "success",
      },
    }); 
  }
  

   return (
        <Ul open={open}>

          <button type="button" onClick={() => setisModalVisible2(true)}> Nova Venda </button>
             {isModalVisible2 ? (<ModalVenda onClose={() => { setisModalVisible2(false) }}/>): null}
          

          <button type="button" ><a href="/produtos"> Pesquisar Produtos</a></button>

          <button type="button" onClick={() => setisModalVisible(true)}> Cadastrar Produto </button>
             {isModalVisible ? (<ModalCadastroProduto onClose={() => { setisModalVisible(false) }}/>): null}
          
          <button type="button" onClick={() => setisModalVisible1(true)}> Cadastrar Fornecedor </button>
             {isModalVisible1 ? (<ModalCadastroFornecedor onClose={() => { setisModalVisible1(false) }}/>): null}
                  
          <button type="button" onClick={handleClick}><BiLogOutCircle/>Logout</button>            
                
        </Ul>
      )};


export default RightNav;
