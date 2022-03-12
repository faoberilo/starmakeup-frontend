import * as React from 'react';
import "./Produtos.css";
import NavBar from '../../components/Navbar/Navbar'
import axios from 'axios';
import GroupButton from '../../components/GroupButton/GroupButton';


export default function Produtos() {    
      const[produtos,setProdutos] = React.useState([]);
      const[total,setTotal] = React.useState("");

    
      const getDados = async ()=>{
        await axios.get("produto").then((response) => {
          const produtos = response.data;
          for (let i = 0; i < produtos[0].length; i++) {
            produtos[0][i].gerenciar = <GroupButton id={produtos[0][i].id} />;
          }
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
                  <th scope="col">Id</th>
                  <th scope="col">Código</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Imagem</th>
                  <th scope="col">Vencimento</th>
                  <th scope="col">Estoque</th>
                  <th scope="col">Gerenciar</th>
                </tr>
            </thead>
            <tbody>
            {produtosFiltrados.map((produto) => (
                    <tr>
                        <th scope="row">{produto.id}</th>
                        <td>{produto.codigo}</td> 
                        <td>{produto.nome} </td>
                        <td id="td-img"><img id="img-tabela"src={produto.imagem} alt="imagem"></img></td>
                        <td>{produto.diaValidade}/{produto.mesValidade}/{produto.anoValidade}</td>
                        <td>{produto.quantidade}</td>
                        <td>{produto.gerenciar}</td>                        
                    </tr>       
                ))}
                    
            </tbody>
        </table>       
    </div>
  );
}
