import React, { useState } from 'react';
import './App.css';
import Mapa from './components/pages/Mapa';
import graficoPizza from './components/assets/img/grafico pizza.png';
import graficoColuna from './components/assets/img/gafico coluna.png';
import CovidData from './CovidData'; // Importa o componente

const regions = {
  'Centro-Oeste': ['Distrito Federal', 'Goiás', 'Mato Grosso', 'Mato Grosso do Sul'],
  'Nordeste': [
    'Alagoas', 'Bahia', 'Ceará', 'Maranhão', 'Paraíba', 'Pernambuco',
    'Piauí', 'Rio Grande do Norte', 'Sergipe'
  ],
  'Norte': ['Acre', 'Amapá', 'Amazonas', 'Pará', 'Rondônia', 'Roraima', 'Tocantins'],
  'Sudeste': ['Espírito Santo', 'Minas Gerais', 'Rio de Janeiro', 'São Paulo'],
  'Sul': ['Paraná', 'Rio Grande do Sul', 'Santa Catarina']
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [regionFilter, setRegionFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegionFilter(selectedRegion);
    // Filtra os estados baseado na região selecionada
    const statesInRegion = regions[selectedRegion] || [];
    setFilteredStates(statesInRegion);
    // Limpa o filtro de estado ao mudar a região
    setStateFilter('');
  };

  const handleStateChange = (e) => {
    setStateFilter(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleFilterClick = () => {
    setShowText(true);
  };

  const handleCloseClick = () => {
    setShowText(false);
  };

  return (
    <>
      <div className='cabeçalho'>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <div className='div-filtros'>
            <h2 className='cor-espaco'>-------------------------</h2>
            <h3>Região</h3>
            <select name="region" className="borda-filtro" onChange={handleRegionChange}>
              <option value="">Selecione a região</option>
              {Object.keys(regions).map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <h2 className='cor-espaco'>-------------------------</h2>

            <h3>Estado</h3>
            <select name="state" className="borda-filtro" onChange={handleStateChange} value={stateFilter}>
              <option value="">Selecione o estado</option>
              {filteredStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <h2 className='cor-espaco'>-------------------------</h2>

            <h3>Período</h3>
            <input type="date" id="date" name="date" className="borda-filtro" onChange={handleDateChange}></input>
          </div>
          <div className="div-botao-filtro">
            <button className="botao-filtro" onClick={handleFilterClick}>Filtrar</button>
          </div>
        </div>
      </div>

      <div className="App">
        <h1 className='cor-espaco'>Covid Brasil</h1>
        <div className='div-mapa'>
          <Mapa />
        </div>
        {showText && (
          <div className="dashboard">
            <button className="fechar-dashboard" onClick={handleCloseClick}>X</button>
            <div>
              <h1>Mortes</h1>
              <p>1000</p>
              <h1>Casos</h1>
              <p>1000</p>
            </div>
            <div>
              <img src={graficoPizza} width={200} height={200} alt="Gráfico de Pizza" />
            </div>
            <div>
              <h1>Porcentagens</h1>
              <p>1000%</p>
            </div>
            <div>
              <img src={graficoColuna} width={200} height={200} alt="Gráfico de Coluna" />
            </div>
          </div>
        )}
        <CovidData region={regionFilter} state={stateFilter} date={dateFilter} />
      </div>
    </>
  );
}

export default App;
