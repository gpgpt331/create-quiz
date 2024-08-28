import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setQuiz(res.data);
            } catch (err) {
                setError('Erro ao buscar o quiz');
                console.error('Erro ao buscar o quiz:', err.response?.data || err.message);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleUpdateQuiz = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/quiz/${id}`, quiz, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSuccess('Quiz atualizado com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar o quiz');
            console.error('Erro ao atualizar o quiz:', err.response?.data || err.message);
        }
    };

    if (!quiz) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Editar Quiz</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleUpdateQuiz}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={quiz.title}
                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    />
                </div>
                {/* Aqui você incluiria inputs para editar perguntas e respostas */}
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditQuiz;
