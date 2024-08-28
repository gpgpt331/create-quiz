// pages/CreatePlan.js

import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../assets/CreatePlan.css'

const CreatePlan = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [duracao, setDuracao] = useState('');
    const [gatewayId, setGatewayId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/plans/create', {
                nome,
                descricao,
                preco,
                duracao,
                gatewayId
            });

            setSuccessMessage('Plano criado com sucesso!');

            setNome('');
            setDescricao('');
            setPreco('');
            setDuracao('');
            setGatewayId('');

            console.log('Plano criado:', response.data);
        } catch (error) {
            console.error('Erro ao criar o plano:', error);
        }
    };

    return (
        <div className='plan-container'>
            <Sidebar/>
            <h2>Criar Novo Plano</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Plano"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Duração (meses)"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Gateway ID"
                    value={gatewayId}
                    onChange={(e) => setGatewayId(e.target.value)}
                    required
                />
                <button type="submit">Criar Plano</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default CreatePlan;
