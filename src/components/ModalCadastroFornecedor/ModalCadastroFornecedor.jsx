import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';



const ModalCadastroFornecedor = ({ onClose = () => {}, Children }) => {
  
  const [open, setOpen] = useState(false);
  const AbreModal = () => setOpen(true);

  useEffect(() => {
    AbreModal();
  }, []);

  
  const navigate = useNavigate();
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    
    
    const nome= evento.target.nome.value;
    const email= evento.target.email.value;
    const cnpj= parseInt(evento.target.cnpj.value);
    const contato= parseInt(evento.target.contato.value);      
      
    const fornecedor = {
      nome,
      email,
      cnpj,
      contato
    };

    console.log(fornecedor);
    
    axios.post("/fornecedor", fornecedor)
        .then((response) => {
          onClose();
          navigate("/admin", {
            state: {
              message: "Fornecedor cadastrado com sucesso!!!",
              type: "success",
            },
          });
          document.location.reload(true);
        })
        .catch((response) => {
          alert(response.message);
        });
    
        const log = {};
        log.idUser= localStorage.getItem("idUser");
        log.idProduto = evento.target.codigo.value;;
        log.campoAlterado = "Cadastro de fornecedor";
        log.valorOriginal = "";
        log.valorAlterado = "";
        axios.post(`/log`, log);
  };
  
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
    <div >
      
      <div id="titulo"><h2>+</h2> <h2>Cadastro de Fornecedor</h2> <h2 onClick={onClose}>✗</h2> </div>

      <form onSubmit={handleSubmit} >

       <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="text"
              name="nome"
              required/>
        <label for="nome">Nome do Fornecedor*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="email"
              name="email"
              required/>
            <label for="email">Email do Fornecedor*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="cnpj"
              required/>
            <label for="email">Cnpj do Fornecedor*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="contato"
              required/>
            <label for="contato">Contato do Fornecedor*</label>
        </div>   

          <div id="button">
            <button type="submit">Enviar</button>
          </div>
         
        </form>
    </div>
    </Modal>
  
  );
};

export default ModalCadastroFornecedor;
