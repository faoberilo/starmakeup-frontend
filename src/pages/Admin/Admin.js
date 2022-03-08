import * as React from 'react';
import "./Admin.css";
import ModalCadastroProduto from '../../components/ModalCadastroProduto/ModalCadastroProduto';
import Message from '../../components/Message/Message';
import { useLocation } from 'react-router-dom';



export default function Admin() {

  const [isModalVisible, setisModalVisible] = React.useState(false);
  const location = useLocation();
  let message = "";
  let type = "";

  if (location.state) {
    message = location.state.message;
    type = location.state.type;
  }


  return (
    <div>
      <h1>Admin</h1>
      <button type="button" onClick={() => setisModalVisible(true)}> Cadastrar Produto </button>
          {isModalVisible ? (<ModalCadastroProduto onClose={() => { setisModalVisible(false) }}/>): null}
      <h1>Admin</h1> 
      {message && <Message msg={message} type={type} />}    
    </div>
  );
}
