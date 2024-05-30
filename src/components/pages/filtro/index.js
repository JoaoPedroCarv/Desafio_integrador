import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../../../App.css';
import '../../assets/filtro.css';

function Dashboard({ onClose, idEstado }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const estado = idEstado.replace("BR-", "");
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
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return <div className="error">Erro ao carregar os dados: {error.message}</div>;
    }

    const grafico1 = {
        labels: ['Mortes', 'Casos'],
        datasets: [
            {
                label: 'COVID-19 Dados',
                data: [data.deaths, data.cases],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ]
    };

    const grafico2 = {
        labels: ['Suspeitas', 'Recusados'],
        datasets: [
            {
                label: 'COVID-19 Dados',
                data: [data.suspects, data.refuses],
                backgroundColor: ['#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FFCE56', '#4BC0C0']
            }
        ]
    };

    return (
        <div className="panel">
            <button className="close-btn" onClick={onClose}>X</button>
            <div className="panel-content">
                <div className="info">
                    <h1> {data.state}</h1>
                    <div className="data-section">
                        <div className="row">
                            <div>
                                <h2>Mortes</h2>
                                <p>{data.deaths}</p>
                            </div>
                            <div>
                                <h2>Casos</h2>
                                <p>{data.cases}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <h2>Suspeitas</h2>
                                <p>{data.suspects}</p>
                            </div>
                            <div>
                                <h2>Recusados</h2>
                                <p>{data.refuses}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <h2> (Mortes e Casos)</h2>
                    <Pie data={grafico1} />
                </div>
                <div className="chart-container">
                    <h2> (Suspeitas e Recusados)</h2>
                    <Bar data={grafico2} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
