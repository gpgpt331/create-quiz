import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    // Função para atualizar o estado dos campos do formulário
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Função para lidar com o envio do formulário
    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Envia uma requisição POST para o backend para autenticação
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Resposta da API:', res);
            
            // Verifica se o token e o userId foram retornados e os armazena no localStorage
            if (res && res.data && res.data.token && res.data.userId) {
                localStorage.setItem('token', res.data.token); // Armazena o token JWT no localStorage
                localStorage.setItem('userId', res.data.userId); // Armazena o userId no localStorage
                navigate('/dashboard'); // Redireciona para a página do dashboard
            } else {
                console.error('Estrutura de resposta inesperada:', res);
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={onSubmit} className='form-login'>
            <div>
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className='input-form'
                />
            </div>
            <div>
                <label>Senha</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    className='input-form'
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
