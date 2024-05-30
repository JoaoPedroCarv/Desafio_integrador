import React, { useState } from 'react';
import '../../assets/login.css';
import { NavLink } from 'react-router-dom';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [preferencia, setPreferencia] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nome, email, senha, preferencia });
    };

    return (
        <div className="login-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <label htmlFor="preferencia">Região de Preferência</label>
                <input
                    type="text"
                    id="preferencia"
                    value={preferencia}
                    onChange={(e) => setPreferencia(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <NavLink to={'/logar'}>voltar</NavLink>
        </div>
    );
};

export default Cadastro;
