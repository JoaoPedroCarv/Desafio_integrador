import React, { useState } from 'react';
import '../../App.css';
//import Mapa from './components/pages/Mapa';
import graficoPizza from '../assets/img/grafico pizza.png';
import graficoColuna from '../assets/img/gafico coluna.png';
//import CovidData from './CovidData'; // Importa o componente

//const [showText, setShowText] = useState(false);


function Dashboard() {
    return (
        <div className="dashboard">
            <button className="fechar-dashboard" >X</button>
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
    )
}

export default Dashboard

