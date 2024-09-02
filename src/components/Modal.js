import React from 'react';
import '../assets/Modal.css'; // Certifique-se de criar o CSS para estilizar o modal

const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Insira suas informações</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="CPF"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        required
                    />
                    <button type="submit">Gerar QR Code</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
