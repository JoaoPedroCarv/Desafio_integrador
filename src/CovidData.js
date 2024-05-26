import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './covidData.css';

const CovidData = ({ region, state, date }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://covid19-brazil-api.now.sh/api/report/v1')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (state) {
      setFilter(state);
    }
  }, [state]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const regionStates = region
    ? {
        'Centro-Oeste': ['Distrito Federal', 'Goiás', 'Mato Grosso', 'Mato Grosso do Sul'],
        'Nordeste': [
          'Alagoas', 'Bahia', 'Ceará', 'Maranhão', 'Paraíba', 'Pernambuco',
          'Piauí', 'Rio Grande do Norte', 'Sergipe'
        ],
        'Norte': ['Acre', 'Amapá', 'Amazonas', 'Pará', 'Rondônia', 'Roraima', 'Tocantins'],
        'Sudeste': ['Espírito Santo', 'Minas Gerais', 'Rio de Janeiro', 'São Paulo'],
        'Sul': ['Paraná', 'Rio Grande do Sul', 'Santa Catarina']
      }[region]
    : [];

  const filteredData = filter && filter.toLowerCase() !== 'todos'
    ? data.data.filter((item) =>
        item.state.toLowerCase().includes(filter.toLowerCase())
      )
    : data.data;

  const filteredByRegion = region
    ? filteredData.filter((item) => regionStates.includes(item.state))
    : filteredData;

  const filteredByDate = date
    ? filteredByRegion.filter((item) => {
        const itemDate = new Date(item.datetime);
        const filterDate = new Date(date);
        return itemDate.toDateString() === filterDate.toDateString();
      })
    : filteredByRegion;

  const shouldShowData = region || state || date || filter;

  const chartData = {
    labels: filteredByDate.map(item => item.state),
    datasets: [
      {
        label: 'Confirmed Cases',
        data: filteredByDate.map(item => item.cases),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Deaths',
        data: filteredByDate.map(item => item.deaths),
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="covid-data-container">
      <h1>COVID-19 Data for Brazil</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by state (or type 'Todos' for all)"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      {shouldShowData && (
        <div>
          {filteredByDate.length === 0 ? (
            <p>No data found.</p>
          ) : (
            <>
              <div className="chart-container">
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="states-data">
                {filteredByDate.map((item, index) => (
                  <div key={index} className="state-data">
                    <h2>{item.state}</h2>
                    <p>Confirmed: {item.cases}</p>
                    <p>Deaths: {item.deaths}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CovidData;
