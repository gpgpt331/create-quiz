import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/Planos.css';
import axios from 'axios';
import API_URL from '../utils/config';

import Modal from '../components/Modal';
import generateSubscribeQrcode from '../services/cashtime.services';

const Planos = () => {
    const [planos, setPlanos] = useState([]);
    const [editData, setEditData] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        duracao: '',
        gatewayId: '',
        email: '',
        cpf: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlano, setSelectedPlano] = useState(null);
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/plans`);
                setPlanos(response.data);
            } catch (error) {
                console.error('Erro ao buscar os planos:', error);
            }
        };

        fetchPlanos();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/plans/delete/${id}`);
            console.log(response.data.message);
            setPlanos(planos.filter((plano) => plano._id !== id));
        } catch (error) {
            console.error('Erro ao deletar o plano:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/api/plans/${editData}`, formData);
            setPlanos(planos.map(plano => plano._id === editData ? response.data : plano));
            setEditData(null);
            setFormData({
                nome: '',
                descricao: '',
                preco: '',
                duracao: '',
                gatewayId: ''
            });
        } catch (error) {
            console.error('Erro ao atualizar o plano:', error);
        }
    };

    const handleEditClick = (plano) => {
        setEditData(plano._id);
        setFormData({
            nome: plano.nome,
            descricao: plano.descricao,
            preco: plano.preco,
            duracao: plano.duracao,
            gatewayId: plano.gatewayId
        });
    };

    const handleSubscribe = (plano) => {
        setSelectedPlano(plano);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dados do usuário e do plano
            const userId = "66cff033c6d58e5adb414547"; // Substitua pelo ID do usuário logado
            const userName = "admin1";
            const userEmail = "admin@gmail.com";
            const planId = "66d61167587b80518149f105";
            const planName = "assinatura";
            const amount = "5000";
    
            // Verifique se todos os dados estão presentes
            if (!userId || !userName || !userEmail || !planId || !planName || !amount) {
                throw new Error("Todos os campos são obrigatórios.");
            }
    
            // Chame a função generateSubscribeQrcode com os dados corretos
            const response = await generateSubscribeQrcode({userId, userName, userEmail, planId, planName, amount});
            setQrCode(response.qrcode);
            alert("Assinatura iniciada com sucesso!");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao assinar o plano:", error);
            alert("Erro ao assinar o plano. Tente novamente.");
        }
    };
    

    return (
        <div className="planos-container">
            <Sidebar />
            <div className="planos-content">
                <div className="planos-header">
                    <h1>Meus Planos</h1>
                </div>

                <div className="planos-lista">
                    {planos.map(plano => (
                        <div className="plano-card" key={plano._id}>
                            <h2>{plano.nome}</h2>
                            <p>{plano.descricao}</p>
                            <p>Preço: {plano.preco}</p>
                            <p>Duração: {plano.duracao} meses</p>
                            <button onClick={() => handleEditClick(plano)}>Editar</button>
                            <button onClick={() => handleDelete(plano._id)}>Deletar Plano</button>
                            <button onClick={() => handleSubscribe(plano)}>Assinar Plano</button>
                        </div>
                    ))}
                </div>

                {editData && (
                    <div className="form-container">
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Descrição"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Preço"
                                value={formData.preco}
                                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Duração"
                                value={formData.duracao}
                                onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Gateway ID"
                                value={formData.gatewayId}
                                onChange={(e) => setFormData({ ...formData, gatewayId: e.target.value })}
                            />
                            <button type="submit">Atualizar Plano</button>
                            <button type="button" onClick={() => setEditData(null)}>Cancelar</button>
                        </form>
                    </div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleModalSubmit}
                    formData={formData}
                    setFormData={setFormData}
                />
                
                {qrCode && (
                    <div className="qrcode-container">
                        <h2>Escaneie o QR Code para efetuar o pagamento</h2>
                        <img src={qrCode} alt="QR Code para pagamento" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Planos;
