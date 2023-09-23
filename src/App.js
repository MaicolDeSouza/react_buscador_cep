import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {
  const [cep, setCep] = useState('');
  const [data, setData] = useState('');

  const handleInput = (e) => {
    setCep(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`${cep}/json`);
      setData(response.data);
      setCep(''); // Limpa campo do input

    } catch (error) {
      alert("Ops, erro ao buscar cep");
      setCep(''); // Limpa campo do input
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          onChange={handleInput}
          type="text"
          placeholder="Digite seu cep"
          value={cep}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="black" />
        </button>
      </div>
      {data ? ( // Se tiver dados renderiza os dados de cep
        <div className="main">
          <h2>CEP: {data.cep}</h2>
          <p>Rua: {data.logradouro}</p>
          <p>Complemento: {data.complemento}</p>
          <p>Bairro: {data.bairro}</p>
          <p>Cidade: {data.localidade}</p>
          <p>Estado: {data.uf}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
