// Settings.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
    return (
        <div className="dashboard-container">
        <Sidebar /> {/* Incluindo a navbar */}
        <div className="dashboard-content">
            <h1>Configurações do Usuario</h1>
            {/* Conteúdo principal do dashboard */}
        </div>
    </div>
    );
};

export default Settings;
