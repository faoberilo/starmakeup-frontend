import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { Modal } from 'react-responsive-modal';
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";
import ModalEditarProduto from "../ModalEditarProduto/ModalEditarProduto";
import ModalDetalhesProduto from "../ModalDetalhesProduto/ModalDetalhesProduto";
import "./styles.css";


const GroupButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isModalVisible, setisModalVisible] = React.useState(false);
  const [isModalDetalhesVisible, setisModalDetalhesVisible] = React.useState(false);
  const [produto, setProduto] = React.useState({});

  const navigate = useNavigate();
  const location = useLocation();
  let message = "";
  let type = "";
  if (location.state) {
    message = location.state.message;
    type = location.state.type;
  }

  const getProdutoById = async () => {
    const request = await axios.get(`/produto/${props.id}`);
    var produto = request.data;
    setProduto(produto);
  };

  React.useEffect(() => {
    getProdutoById();
  }, []);

  const deletaProduto = () => {
    axios.delete(`/produtosprecos/${props.id}`);
    setTimeout(() => {
      axios.delete(`/produto/${props.id}`).then((response) => {
        navigate("/admin", {
          state: { message: "Produto deletado com sucesso!", type: "success" },
        });
        document.location.reload(true);
        handleClose();
      });
    }, 1000);
    const log = {};
    log.idUser= localStorage.getItem("idUser");
    log.idProduto = produto.produto1;
    log.campoAlterado = "Exclusão de produto";
    log.valorOriginal = "";
    log.valorAlterado = "";  
    axios.post(`/log`, log);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} showCloseIcon={false}>
            <div id="modal">
            <h2>Deseja realmente excluir o produto?</h2>
            <div id="buttonExcluir">
            <button id="buttonExcluir"type="button" onClick={deletaProduto} class="btn btn-success">Sim</button>
            <button id="buttonExcluir"type="button" onClick={handleClose} class="btn btn-danger">Não</button>
            </div>
            </div>
      </Modal>
      <div id="group">         
          <button id="groupButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Mais detalhes do produto" type="button" onClick={() => setisModalDetalhesVisible(true)}>
          <BiPlusCircle />
          </button>
        {isModalDetalhesVisible ? (<ModalDetalhesProduto id={props.id} onClose={() => {setisModalDetalhesVisible(false);}}/>) : null}
          <button id="groupButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar produto" type="button" onClick={() => setisModalVisible(true)}>
            <BiEdit />
          </button>
        {isModalVisible ? (<ModalEditarProduto id={props.id} onClose={() => {setisModalVisible(false);}}/>) : null}
          <button id="groupButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir produto" onClick={handleOpen}>
            <BiTrash />
          </button>
      </div>
    </div>
  );
};

export default GroupButton;
