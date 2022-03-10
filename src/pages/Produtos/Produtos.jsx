import * as React from 'react';
import "./Produtos.css";
import NavBar from '../../components/Navbar/Navbar'
import axios from 'axios';

export default function Produtos() {    
      const[produtos,setProdutos] = React.useState([]);
      const[total,setTotal] = React.useState("");

    
      const getDados = async ()=>{
        await axios.get("produto").then((response) => {
          console.log(response)
          const produtos = response.data;
          setProdutos(produtos[0]);
          setTotal(produtos[1]);
        })
      }      

      React.useEffect(() => {
        getDados();        
       }, []);

       const [busca, setBusca] = React.useState("");

       const lowerBusca = busca.toLowerCase();
     
       const produtosFiltrados = produtos.filter(
         (produto) =>
           produto.nome.toLowerCase().includes(lowerBusca) ||
           produto.codigo.includes(lowerBusca)
       );     

  return (
    <div id="tabela">
      <NavBar/>
      <p>{total}</p>
      <h2>Produtos</h2>
      <input
        id='search'
        type="search"
        placeholder="O que você procura?"
        value={busca}
        onChange={(ev) => setBusca(ev.target.value)}
      />
      
      <table class="table table-striped">
            <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Vencimento</th>
                  <th scope="col">Estoque</th>
                </tr>
            </thead>
            <tbody>
            {produtosFiltrados.map((produto,index) => (
                    <tr>
                        <th scope="row">{produto.codigo}</th>
                        <td><img src={produto.imagem} alt="imagem do "></img>{produto.nome} </td>
                        <td>{produto.descricao}</td>
                        <td>{produto.diaValidade}/{produto.mesValidade}/{produto.anoValidade}</td>
                        <td>{produto.quantidade}</td>
                    </tr>       
                ))}
                    
            </tbody>
        </table>       
    </div>
  );
}
