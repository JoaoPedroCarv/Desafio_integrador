import { Routes, Route, } from 'react-router-dom'
import Login from '../components/pages/login'
import Inicio from '../components/pages/inicio/index.js';

function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/logar" element={<Login />} />
        </Routes>
    )
}

export default RoutesApp;