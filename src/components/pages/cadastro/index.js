import React, { useState } from 'react';
import '../../assets/cadastro.css';
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
        <div className="container">
            <div className="left-panel">
                <h2>Perfil</h2>
                <p>Acesse seu perfil com infomações filtradas</p>
                <NavLink to={'/logar'} className="btn-signin">Login</NavLink>
            </div>
            <div className="right-panel">
                <h2>Crie Sua conta</h2>

                <p></p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Região de Preferência"
                        value={preferencia}
                        onChange={(e) => setPreferencia(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-signup">Acessar</button>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;
