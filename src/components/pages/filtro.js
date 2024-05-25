import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../App.css';
import '../assets/filtro.css'

function Dashboard({ onClose, idEstado }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const estado = idEstado.replace("BR-", "")
        console.log(estado + 'aaaaaaaaaaaaaaaaaaaa')
        axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${estado}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [idEstado]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    const grafico = {
        labels: ['Mortes', 'Casos', 'Suspeitas', 'Recusados'],
        datasets: [
            {
                data: [data.deaths, data.cases, data.suspects, data.refuses],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }
        ]
    };

    return (
        <div className="popup-overlay">
            <div className='popup'>
                <button className="close-btn" onClick={onClose}>X</button>
                <div className="popup-content">
                    <div className="info">
                        <h1>Estado: {data.state}</h1>
                        <h1>Mortes</h1>
                        <p>{data.deaths}</p>
                        <h1>Casos</h1>
                        <p>{data.cases}</p>
                        <h1>Suspeitas</h1>
                        <p>{data.suspects}</p>
                        <h1>Recusados</h1>
                        <p>{data.refuses}</p>
                    </div>
                    <div className="chart-container">
                        <Pie data={grafico} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
