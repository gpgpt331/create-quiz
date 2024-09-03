import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css'; // Estilo que será aplicado à navbar

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/createplan">Criar Plano</Link></li>
                <li><Link to="/planos">Planos</Link></li>
                <li><Link to="/quiz">Criar Quiz</Link></li> 
                <li><Link to="/quizzes">Meu Quiz</Link></li>
                <li><Link to="/models">Modelo</Link></li>
                <li><Link to="/settings">Configurações</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
