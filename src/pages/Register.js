import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',  // Atualizado para `username`
        email: '',
        password: '',
    });

    const { username, email, password } = formData;  // Atualizado para `username`

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Nome de Usuário</label>
                <input
                    type="text"
                    name="username"  // Atualizado para `username`
                    value={username}  // Atualizado para `username`
                    onChange={onChange}
                    required
                    className='input-form'
                />
            </div>
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
                    required
                    className='input-form'
                />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
