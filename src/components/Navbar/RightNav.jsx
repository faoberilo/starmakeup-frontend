import React from "react";
import { BiLogOutCircle} from "react-icons/bi";
import { Ul } from "./styles";
import ModalCadastroProduto from '../../components/ModalCadastroProduto/ModalCadastroProduto';


const handleClick = event =>{
  event.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('idUser');
  localStorage.removeItem('tipo');  
  document.location.reload('/');
}

const RightNav = ({ open }) => { 
  const [isModalVisible, setisModalVisible] = React.useState(false); 

   return (
        <Ul open={open}>        
          
            <button type="button" onClick={() => setisModalVisible(true)}> Cadastrar Produto </button>
             {isModalVisible ? (<ModalCadastroProduto onClose={() => { setisModalVisible(false) }}/>): null}
        
          
          <button type="button" onClick={handleClick}> 
              <BiLogOutCircle/>Logout            
          </button>            
                
        </Ul>
      )};


export default RightNav;
