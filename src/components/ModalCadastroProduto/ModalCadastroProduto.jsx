import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";



const ModalCadastroProduto = ({ onClose = () => {}, Children }) => {
  
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
    
    const codigo= evento.target.codigo.value;
    const imagem= evento.target.imagem.value;
    const nome= evento.target.nome.value;
    const descricao= evento.target.descricao.value;      
    const data= evento.target.dataValidade.value;
    const dataValidade = data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3] 
    const quantidade= parseInt(evento.target.quantidade.value);
    const tipoid = parseInt(evento.target.tipo.value);

    const produto = {
      codigo,
      imagem,
      nome,
      descricao,      
      dataValidade,
      quantidade
    };

    const tipoProduto = {
      produtoid:codigo,
      tipoid
    };

    console.log(tipoProduto)


    const produtopreco = {};

    axios.post("/produto", produto).then((response) => {});

    setTimeout(() => {
      axios
        .post("/tipo-produto", tipoProduto)
        .then((response) => {
          onClose();
          navigate("/admin", {
            state: {
              message: "Produto cadastrado com sucesso!!!",
              type: "success",
            },
          });
          document.location.reload(true);
        })
        .catch((response) => {
          alert(response.message);
        });
    }, 1000);

        const log = {};
        log.idUser= localStorage.getItem("idUser");
        log.idProduto = evento.target.codigo.value;;
        log.campoAlterado = "Cadastro de produto";
        log.valorOriginal = "";
        log.valorAlterado = "";
        axios.post(`/log`, log);
  };

  
  return (
    
    <div className="modal">
      <span onClick={onClose}>✗</span>
      <h1>+ Cadastro de Produto </h1>

      <form onSubmit={handleSubmit}>          
            <input
              type="text"
              id="codigo"
              name="codigo"
              placeholder="Código do Produto"
              required/>
            <input
              type="text"
              id="imagem"
              name="imagem"
              placeholder="Imagem do Produto"
              required/>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome do Produto"
              required/>
            <input
              type="text"
              id="descricao"
              name="descricao"
              placeholder="Descrição do Produto"
              required/>
            <select name="tipo" required>
              <option value="">Tipo de Produto</option>
              <option value={1}>Unidade</option>
              <option value={2}>Pacote</option>
              <option value={3}>Caixa</option>
              
            </select>

            <input
              type="text"
              id="fornecedor"
              name="fornecedor"
              placeholder="Fornecedor"
              required/>
            <input
              type="date"
              id="date"
              name="dataValidade"
              placeholder="Validade do Produto: "
              required/>
            <input
                type="number"
                id="quantidade"
                name="quantidade"
                placeholder="Quantidade"
                required/>
            <input
                type="number"
                id="precoCusto"
                name="precoCusto"
                placeholder="Preço Custo"
                required/>
            <input
                type="number"
                id="porcetagemLucro"
                name="porcetagemLucro"
                placeholder="% Lucro"
                required/>
            <input
                type="number"
                id="promocaodesconto"
                name="promocaodesconto"
                placeholder="% Promoção"
                required/>
            <input
                type="number"
                id="valorVenda"
                name="valorVenda"
                placeholder="Preço de venda"
                required/>
            <input
                type="number"
                id="valorAtacado"
                name="valorAtacado"
                placeholder="Preço de Atacado"
                required/>
          <div>
            <button type="submit">Enviar</button>
          </div>
         
        </form>
    </div>
  
  );
};

export default ModalCadastroProduto;
