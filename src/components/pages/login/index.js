import React, { useState } from 'react';
import '../../assets/login.css';
import { NavLink } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'l' && password === '123') {
            onLogin();
        } else {
            setError('Usuário ou senha incorretos');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">E-mail</label>
                <input
                    type="text"
                    id="username"
                    placeholder='Digite seu E-mail'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Acessar Portal</button>
                {error && <p className="error">{error}</p>}
            </form>
            <NavLink to={'/cadastro'}>Cadastrar</NavLink>
            <br></br>
            <NavLink to={'/'}>voltar</NavLink>
        </div>
    );
};

export default Login;
