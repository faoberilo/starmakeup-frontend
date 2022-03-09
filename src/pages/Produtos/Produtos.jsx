import * as React from 'react';
import "./Produtos.css";
import NavBar from '../../components/Navbar/Navbar'
import axios from 'axios';

export default function Produtos() {    
      const[produtos,setProdutos] = React.useState([]);
      const[precos,setPrecos] = React.useState([]);
    
      const getDados = async ()=>{
        await axios.get("produto").then((response) => {
          const produtos = response.data;
          setProdutos(produtos);
        })
      }
      const getDados1 = async ()=>{
        await axios.get("produtosprecos").then((response) => {
            const precos = response.data;
            setPrecos(precos)
        })
      }  

      React.useEffect(() => {
        getDados1();
        getDados();
        
       }, []);

       console.log(produtos)
       console.log(precos)
     

  return (
    <div>
      <NavBar/>
      <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Código</th>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Vencimento</th>
                <th scope="col">Estoque</th>
                <th scope="col">Preço de Custo</th>
                </tr>
            </thead>
            <tbody>
            {produtos.map((produto,index) => (
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
