import React, { useState, useEffect } from 'react';
import './css/App.css';
import Axios from 'axios';

function App() {

  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [valor, setValor] = useState("");
  const [produtosList, setProdutosList] = useState([]);

  const [novoNome, setNovoNome] = useState("")
  const [novaMarca, setNovaMarca] = useState("")
  const [novoValor, setNovoValor] = useState("")

  useEffect(() => {
    Axios.get('http://localhost:8080/api/produtos').then((response)=>{  
      setProdutosList(response.data)
    });
  }, []);

  const submitProduto = () => {

    Axios.post('http://localhost:8080/api/produto', {
      nome: nome, 
      marca: marca,
      valor: valor,
    });

      setProdutosList([
        ...produtosList, 
        {nome: nome, marca: marca, valor: valor},
      ]);

  };

    const deleteProduto = (id) => {
      Axios.delete(`http://localhost:8080/api/produto/${id}`);
    }

    const updateNome = (id) => {
      Axios.put(`http://localhost:8080/api/produto/${id}`, {
      id: id, 
      nome: novoNome,
    });
    setNovoNome("");
    };

    const updateMarca = (id) => {
      Axios.put(`http://localhost:8080/api/produto/${id}`, {
      id: id, 
      marca: novaMarca,
    });
    setNovaMarca("")
    };

    const updateValor = (id) => {
      Axios.put(`http://localhost:8080/api/produto/${id}`, {
      id: id, 
      valor: novoValor,
    });
    setNovoValor("");
    };

    

  return (
    <div className="App">
          <div className='header'>
            <h1>CRUD APP</h1>
          </div>
    <div className="form">
        <label>Nome: </label>
        <input 
          type="text" 
          name="nome" 
          onChange={(e)=>{
            setNome(e.target.value)
          }}
        />
        <label>Marca:</label>
        <input 
          type="text" 
          name="marca" 
          onChange={(e)=>{
          setMarca(e.target.value)
          }}
        />
        <label>Valor:</label>
        <input 
          type="text" 
          name="valor" 
          onChange={(e)=>{
          setValor(e.target.value)
          }}
        />
        <button onClick={submitProduto}>Criar</button>
      </div>
      {produtosList.map((val) => {
          return (
          <div className="card">
            <div className='nome'><h1>{val.nome}</h1></div>
            <div className='marca'><p>Marca: {val.marca}</p></div>
            <div className='valor'><p>Valor: R${val.valor}</p></div>
            <div className='deletar'><button onClick={() => deleteProduto(val.id)}>Deletar</button></div>
            <div className='editar'>
              <div><input type="text" id="updateInput" placeholder='Nome' onChange={(e) => {
                setNovoNome(e.target.value)
            }} /><button onClick={()=> {updateNome(val.id)}}>Editar</button></div>
              <div><input type="text" id="updateInput" placeholder='Marca' onChange={(e) => {
                setNovaMarca(e.target.value)
            }} /><button onClick={()=> {updateMarca(val.id)}}>Editar</button></div>
              <div><input type="text" id="updateInput" placeholder='Valor' onChange={(e) => {
                setNovoValor(e.target.value)
            }} /><button onClick={()=> {updateValor(val.id)}}>Editar</button></div>
            </div>
          </div>)
        })}
    </div>
  );
}

export default App;
