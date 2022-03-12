import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';



const ModalVenda = ({ onClose = () => {}, Children }) => {
  
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
    
    const produto= evento.target.produto.value;
    const quantidade= parseInt(evento.target.quantidade.value);
    const valorExtra= parseFloat(evento.target.valorExtra.value);
    const desconto= parseInt(evento.target.desconto.value);
    const pagamento= evento.target.pagamento.value;
    const valorFinal= parseFloat(evento.target.valorFinal.value);     
      
    const venda = {
      produto,
      quantidade,
      valorExtra,
      desconto,
      pagamento,
      valorFinal
    };

    console.log(venda)

   
    axios.post("/venda", venda)
        .then((response) => {
          onClose();
          navigate("/home", {
            state: {
              message: "Venda cadastrado com sucesso!!!",
              type: "success",
            },
          });
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
      
      <div id="titulo"><h2>+</h2> <h2>Nova Venda</h2> <h2 onClick={onClose}>✗</h2> </div>

      <form onSubmit={handleSubmit} >

       <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="text"
              name="produto"
              required/>
        <label>Produto*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="quantidade"
              required/>
            <label> Quantidade*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="valorExtra"
              required/>
            <label >ValorExtra*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="desconto"
              required/>
            <label> Desconto*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="text"
              name="pagamento"
              required/>
        <label>Pagamento*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="valorFinal"
              required/>
            <label> valorFinal*</label>
        </div>   

          <div id="button">
            <button type="submit">Enviar</button>
          </div>
         
        </form>
    </div>
    </Modal>
  
  );
};

export default ModalVenda;
