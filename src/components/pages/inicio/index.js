import React, { useState } from 'react';
import '../../../App.css';
import Mapa from '../mapa/index';
import graficoPizza from '../../assets/img/grafico pizza.png';
import graficoColuna from '../../assets/img/gafico coluna.png';
import CovidData from '../../../CovidData';
import { NavLink } from 'react-router-dom';
//import Login from '../login/index';

function Inicio() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showText, setShowText] = useState(false);
    const [regionFilter, setRegionFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filterType, setFilterType] = useState('');
    const [countryData, setCountryData] = useState(null);

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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        setRegionFilter(selectedRegion);
        const statesInRegion = regions[selectedRegion] || [];
        setFilteredStates(statesInRegion);
        setStateFilter('');
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterValue(value);
        if (regions[value]) {
            setFilterType('state');
        } else {
            setFilterType('country');
        }
    };

    const handleFilterClick = () => {
        setShowText(true);
        if (filterType === 'country') {
            fetchCountryData();
        }
    };

    const handleCloseClick = () => {
        setShowText(false);
    };

    const fetchCountryData = () => {
        fetch(`https://covid19-brazil-api.now.sh/api/report/v1/countries/${filterValue}`)
            .then(response => response.json())
            .then(data => setCountryData(data))
            .catch(error => console.error('Error fetching country data:', error));
    };

    return (
        <>
            <div className='cabecalho'>
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

                        <h3>Local</h3>
                        <select name="filter" className="borda-filtro" onChange={handleFilterChange}>
                            <option value="">Selecione o local</option>
                            {Object.keys(regions).map(region => (
                                regions[region].map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))
                            ))}
                            <option value="country">País</option>
                        </select>
                    </div>
                  
                    <div>
                        <NavLink to={'/logar'}>Entrar</NavLink>
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
                        {/* Exibir dados do país */}
                        {countryData && (
                            <div>
                                <h1>Dados de {countryData.country}</h1>
                                <p>Casos confirmados: {countryData.cases}</p>
                                <p>Mortes: {countryData.deaths}</p>
                                <p>Recuperados: {countryData.recovered}</p>
                            </div>
                        )}
                    </div>
                )}
                <CovidData region={regionFilter} state={stateFilter} />
            </div>
        </>
    );
}

export default Inicio;