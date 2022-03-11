import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';



const ModalCadastroProduto = ({ onClose = () => {}, Children }) => {
  
  const [open, setOpen] = useState(false);
  const AbreModal = () => setOpen(true);

  useEffect(() => {
    AbreModal();
    getFornecedores();
  }, []);

  const[fornecedores,setFornecedores] = React.useState([]);

  const getFornecedores = async ()=>{
    await axios.get("fornecedor").then((response) => {
      const fornecedores = response.data;
      setFornecedores(fornecedores[0]);
    })
  }
  
  const navigate = useNavigate();
  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  const [custo, setCusto] = React.useState("");
  const [lucro, setLucro] = React.useState("");


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
          navigate("/home", {
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
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
    <div >
      
      <div id="titulo"><h2>+</h2> <h2>Cadastro de Produto</h2> <h2 onClick={onClose}>✗</h2> </div>

      <form onSubmit={handleSubmit} >

        <div class="form-floating mb-1">
        <input
          class="form-control"          
          type="text"
          name="codigo"
          required/>
          <label for="codigo">Codigo do Produto*</label>
        </div>

        <div class="form-floating mb-1">
            <input
              class="form-control" 
              type="text"
              name="imagem"
              />
            <label for="imagem">Imagem do Produto</label>
        </div>

        <div class="form-floating mb-1">              
            <input
              class="form-control" 
              type="text"
              name="nome"
              required/>
        <label for="nome">Nome do Produto*</label>
        </div>

        <div class="form-floating mb-1">              
            <input
              class="form-control" 
              type="text"
              name="descricao"
              required/>
            <label for="descricao">Descrição do Produto*</label>
        </div>

        <div class="row g-1">
          <div class="col-md">
            <div class="form-floating">
            <select class="form-select mb-1" name="tipo" required>
              <option ></option>              
              <option value={1}>Unidade</option>
              <option value={2}>Pacote</option>
              <option value={3}>Caixa</option>              
            </select>
            <label for="tipo">Tipo de Produto*</label>
            </div>
          </div>
          <div class="col-md">
          <div class="form-floating">
        <select class="form-select mb-1" name="fornecedorid" required>
          <option selected></option>
            {fornecedores.map((fornecedor) => (
            <option value={fornecedor.cnpj} >{fornecedor.nome}</option>
            ))}              
        </select>
        <label for="fornecedorid">Fornecedor*</label>
      </div>
          </div>
        </div>

        <div class="row g-1">
          <div class="col-md">
            <div class="form-floating">
              <input
                class="form-control"
                type="date"
                name="dataValidade"              
                required/>
              <label for="dataValidade">Data de Validade*</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating mb-1">
            <input
              class="form-control"
              type="number"
              name="quantidade"
              required/>
            <label for="quantidade">Quantidade*</label>
            </div>
          </div>
        </div>

        <div class="row g-1">
          <div class="col-md">
            <div class="form-floating mb-1">
            <input
              class="form-control"
              type="text"
              name="precoCusto"
              onChange={(event) => setCusto(parseFloat(event.target.value))}
              required/>
            <label for='precoCusto'>Preço de Custo*</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating mb-1">
                <input
                  class="form-control"
                  type="number"
                  name="porcentagemLucro"
                  onChange={(event) => setLucro(parseInt(event.target.value))}
                  required/>
                  <label for="porcentagemLucro">% de Lucro*</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating mb-1">
              <input
                class="form-control"
                type="text"
                name="valorVenda"
                value={custo+custo*lucro/100}
                required/>
              <label for="valorVenda">Preço de Venda*</label>
            </div>
          </div>
        </div>

        <div class="row g-1">
          <div class="col-md">
            <div class="form-floating mb-1">
              <input
                class="form-control"
                type="number"
                name="promocaodesconto"
                required/>
              <label for="promocaodesconto">% de Promoção*</label>
            </div>
          </div>
          <div class="col-md">
            <div class="form-floating mb-1">
              <input
                class="form-control"
                type="text"
                name="valorAtacado"
                required/>
                <label for="valorAtacado">Preço de Atacado*</label>            
            </div>
          </div>       
        </div>

          <div id="button">
            <button type="submit">Enviar</button>
          </div>
         
        </form>
    </div>
    </Modal>
  
  );
};

export default ModalCadastroProduto;
