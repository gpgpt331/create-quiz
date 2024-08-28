import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 



const Dashboard = () => {


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Se o token não estiver presente, redirecione para a página de login
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Bem-vindo ao Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;
