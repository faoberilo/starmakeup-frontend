import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';



const ModalVenda = ({ onClose = () => {}, Children }) => {
  
  const [open, setOpen] = useState(false);
  const AbreModal = () => setOpen(true);
  const[produtos,setProdutos] = React.useState([]);

  const getDados = async ()=>{
    await axios.get("produto").then((response) => {
      const produtos = response.data;
      setProdutos(produtos[0]);
    })
  }      


  useEffect(() => {
    AbreModal();
    getDados();
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
    const valorExtra= parseInt(evento.target.valorExtra.value);
    const desconto= parseInt(evento.target.desconto.value);
    const valorDebito= parseInt(evento.target.valorDebito.value);
    const valorCredito= parseInt(evento.target.valorDebito.value);
    const valorFinal= parseInt(evento.target.valorFinal.value);
    const valorDinheiro= parseInt(evento.target.valorDinheiro.value);
    const caixa= parseInt(evento.target.caixa.value);       
      
    const venda = {
      produto,
      quantidade,
      valorExtra,
      desconto,
      valorDebito,
      valorCredito,
      valorDinheiro,     
      valorFinal,
      caixa
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
    
  };
  
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
    <div >
      
      <div id="titulo"><h2>+</h2> <h2>Nova Venda</h2> <h2 onClick={onClose}>✗</h2> </div>

      <form onSubmit={handleSubmit} >

        <div class="col-md">
          <div class="form-floating">
        <select class="form-select mb-3" name="produto" required>
          <option selected></option>
            {produtos.map((produto) => (
            <option value={produto.codigo} >{produto.nome}</option>
            ))}              
        </select>
        <label for="produto<">Produto*</label>
      </div>
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
              name="valorDebito"
              required/>
        <label>Valor Débito*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="text"
              name="valorCredito"
              required/>
        <label>Valor Crédito*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="text"
              name="valorDinheiro"
              required/>
        <label>Valor Dinheiro*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="valorFinal"
              required/>
            <label> Valor Final*</label>
        </div>

        <div class="form-floating mb-3">              
            <input
              class="form-control" 
              type="number"
              name="caixa"
              required/>
            <label> Caixa*</label>
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
