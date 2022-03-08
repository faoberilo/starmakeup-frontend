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
    const diaValidade = parseInt(data[8]+data[9]);
    const mesValidade = parseInt(data[5]+data[6]);
    const anoValidade = parseInt(data[0]+data[1]+data[2]+data[3]); 
    const quantidade= parseInt(evento.target.quantidade.value);
    const tipoid = parseInt(evento.target.tipo.value);
    const precoCusto= parseFloat(evento.target.precoCusto.value);
    const porcentagemLucro= parseInt(evento.target.porcentagemLucro.value);
    const promocaodesconto= parseInt(evento.target.promocaodesconto.value);
    const valorVenda= parseFloat(evento.target.valorVenda.value);
    const valorAtacado= parseFloat(evento.target.valorAtacado.value);
    const fornecedorid= parseInt(evento.target.fornecedorid.value);

    const produto = {
      codigo,
      imagem,
      nome,
      descricao,      
      diaValidade,
      mesValidade,
      anoValidade,
      quantidade
    };

    const tipoProduto = {
      produtoid:codigo,
      tipoid
    };

    const produtoPreco = {
      codigoid:codigo,
      precoCusto,
      porcentagemLucro,
      promocaodesconto,
      valorVenda,
      valorAtacado
    };

    const fornecedorProduto = {
      produtoid:codigo,
      fornecedorid,
    }

    axios.post("/produto", produto).then((response) => {});

    setTimeout(() => {
      axios
        .post("/produtosprecos", produtoPreco)
        .catch((response) => {
          alert(response.message);
        });
    }, 500);

    setTimeout(() => {
      axios
        .post("/fornecedor-produto", fornecedorProduto)
        .catch((response) => {
          alert(response.message);
        });
    }, 1000);


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
    }, 1500);

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
              id="fornecedorid"
              name="fornecedorid"
              placeholder="Código do Fornecedor"
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
                type="text"
                id="precoCusto"
                name="precoCusto"
                placeholder="Preço Custo"
                required/>
            <input
                type="number"
                id="porcentagemLucro"
                name="porcentagemLucro"
                placeholder="% Lucro"
                required/>
            <input
                type="number"
                id="promocaodesconto"
                name="promocaodesconto"
                placeholder="% Promoção"
                required/>
            <input
                type="text"
                id="valorVenda"
                name="valorVenda"
                placeholder="Preço de venda"
                required/>
            <input
                type="text"
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
