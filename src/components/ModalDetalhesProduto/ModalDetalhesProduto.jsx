import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ModalDetalhesProduto = ({ onClose = () => {}, Children, id}) => {

  const [open, setOpen] = useState(false);
  const AbreModal = () => setOpen(true);
  const[produto,setProduto] = React.useState([]);
  const[preco,setPreco] = React.useState([]);
  const[tipo,setTipo] = React.useState([]);
  const[fornecedor,setFornecedor] = React.useState([]);
  const[estoque,setEstoque] = React.useState([]);
  const[valor,setValor] = React.useState([]);

  useEffect(() => {
    AbreModal();
    getDados();
  }, []);

  const getDados = async ()=> {
        await axios.get(`produto/${id}`).then((response) => {
        const produto = response.data;
        setProduto(produto[0]);
        setPreco(produto[1]);
        setTipo(produto[2]);
        setFornecedor(produto[3]);
        setEstoque(produto[4]);
        setValor(produto[5]);
        console.log(produto)          
        })
      }

  return (
  <div>
    <Modal open={open} onClose={onClose} showCloseIcon={false}>
     <div id="modalDetalhes">
       <div id="titulo"><h2>+</h2> <h2>{produto.nome}</h2> <h2 onClick={onClose}>✗</h2> </div>
       <img src={produto.imagem} alt="imagem do "></img>
       <p>Código: {produto.codigo} </p>
       <p>Descrição: {produto.descricao}</p>
       <p>Vencimento: {produto.diaValidade}/{produto.mesValidade}/{produto.anoValidade}</p>
       <p>Estoque: {produto.quantidade}</p>
       <p>Preço de Custo: {preco.precoCusto}</p>
       <p>Margem de lucro: {preco.porcentagemLucro}%</p>
       <p>Preço de Venda: {preco.valorVenda}</p>
       <p>Margem promocional: {preco.promocaodesconto}%</p>
       <p>Tipo: {tipo.tipoid}</p>
       <p>Cnpj Fornecedor: {fornecedor.fornecedorid}</p>
       <p>{estoque}</p>
       <p>{valor}</p>
       

    </div>              
    <h1>{id}</h1>
    </Modal>
  
  </div>
  );
};

export default ModalDetalhesProduto;
