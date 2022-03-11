import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ModalEditarProduto = ({ onClose = () => {}, Children, id }) => {

  const [open, setOpen] = useState(false);
  const AbreModal = () => setOpen(true);

  const[produto,setProduto] = React.useState([]);
  const[preco,setPreco] = React.useState([]);
  const[tipo,setTipo] = React.useState([]);
  const[fornecedor,setFornecedor] = React.useState([]);

  useEffect(() => {
    AbreModal();
    getFornecedores();
    getDados();
  }, []);

  const getDados = async ()=> {
        await axios.get(`produto/${id}`).then((response) => {
        const produto = response.data;
        setProduto(produto[0]);
        setPreco(produto[1]);
        setTipo(produto[2]);
        setFornecedor(produto[3]);
        console.log(produto)          
        })
      }
      
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

  const handleFieldsChange = (evento) => {
    const campos = { ...produto };
    campos[evento.target.name] = evento.target.value;
    setProduto(campos);
  };
  const handleFieldsChange1 = (evento) => {
    const campos = { ...preco };
    campos[evento.target.name] = evento.target.value;
    setPreco(campos);
  };

  const handleFieldsChange2 = (evento) => {
    const campos = { ...tipo };
    campos[evento.target.name] = evento.target.value;
    setTipo(campos);
  };

  const handleFieldsChange3 = (evento) => {
    const campos = { ...fornecedor };
    campos[evento.target.name] = evento.target.value;
    setFornecedor(campos);
  };

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
    const tipoid = parseInt(evento.target.tipoid.value);
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

    axios.patch(`/produto/${id}`, produto).then((response) => {});

    setTimeout(() => {
      axios
        .patch(`/produtosprecos/${id}`, produtoPreco)
        .catch((response) => {
          alert(response.message);
        });
    }, 500);

    setTimeout(() => {
      axios
        .patch(`/fornecedor-produto/${id}`, fornecedorProduto)
        .catch((response) => {
          alert(response.message);
        });
    }, 1000);


    setTimeout(() => {
      axios
        .patch(`/tipo-produto/${id}`, tipoProduto)
        .then((response) => {
          onClose();
          navigate("/home", {
            state: {
              message: "Produto editado com sucesso!!!",
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
      
      <div id="titulo"><h2>+</h2> <h2>Edição de Produto</h2> <h2 onClick={onClose}>✗</h2> </div>

      <form onSubmit={handleSubmit} >

        <div class="form-floating mb-1">
        <input
          class="form-control"          
          type="text"
          name="codigo"
          onChange={handleFieldsChange}
          value={produto.codigo}
          required/>
          <label for="codigo">Codigo do Produto*</label>
        </div>

        <div class="form-floating mb-1">
            <input
              class="form-control" 
              type="text"
              name="imagem"
              onChange={handleFieldsChange}
              value={produto.imagem}
              />
            <label for="imagem">Imagem do Produto</label>
        </div>

        <div class="form-floating mb-1">              
            <input
              class="form-control" 
              type="text"
              name="nome"
              onChange={handleFieldsChange}
              value={produto.nome}
              required/>
        <label for="nome">Nome do Produto*</label>
        </div>

        <div class="form-floating mb-1">              
            <input
              class="form-control" 
              type="text"
              name="descricao"
              onChange={handleFieldsChange}
              value={produto.descricao}
              required/>
            <label for="descricao">Descrição do Produto*</label>
        </div>

        <div class="row g-1">
          <div class="col-md">
            <div class="form-floating">
            <select 
            class="form-select mb-1" 
            name="tipoid"
            onChange={handleFieldsChange2}
            value={tipo.tipoid}           
            required>
              <option selected></option>              
              <option value={1}>Unidade</option>
              <option value={2}>Pacote</option>
              <option value={3}>Caixa</option>              
            </select>
            <label for="tipo">Tipo de Produto*</label>
            </div>
          </div>
          <div class="col-md">
          <div class="form-floating">
        <select 
          class="form-select mb-1" 
          name="fornecedorid" 
          onChange={handleFieldsChange3}
          value={fornecedor.fornecedorid}
            required>
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

export default ModalEditarProduto;