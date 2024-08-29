// Profile.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const Profile = () => {
    return (
        <div className="dashboard-container">
            <Sidebar /> {/* Incluindo a navbar */}
            <div className="dashboard-content">
                <h1>Perfil do Usuario</h1>
                <div className='information-container'>
                    <div>
                        <h3>Editar Perfil de usuario</h3>
                        <input
                        type='text'
                        placeholder='Nome de Usuario'
                        />
                        <input
                        type='text'
                        placeholder='Email de Usuario'
                        />
                        <input
                        type='text'
                        placeholder='Senha de Usuario'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

