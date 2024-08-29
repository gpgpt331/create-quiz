import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Quizzes.css';
import Sidebar from '../components/Sidebar';
import API_URL from '../utils/config';


const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState('');
    const [editingQuizId, setEditingQuizId] = useState(null);
    const [editingData, setEditingData] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/api/quiz/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setQuizzes(res.data);
            } catch (err) {
                setError('Erro ao buscar quizzes');
                console.error('Erro ao buscar quizzes:', err.response?.data || err.message);
            }
        };

        fetchQuizzes();
    }, []);

    const handleEditQuiz = (quiz) => {
        setEditingQuizId(quiz._id);
        setEditingData({ ...quiz });
    };

    const handleSaveQuiz = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/api/quiz/${id}`, editingData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setQuizzes(quizzes.map(quiz => quiz._id === id ? editingData : quiz));
            setEditingQuizId(null);
            setEditingData(null);
            alert('Quiz atualizado com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar o quiz:', err.response?.data || err.message);
            alert('Erro ao atualizar o quiz.');
        }
    };

    const handleChange = (e, questionIndex, answerIndex) => {
        const updatedQuiz = { ...editingData };
        if (answerIndex !== undefined) {
            updatedQuiz.questions[questionIndex].answers[answerIndex].text = e.target.value;
        } else {
            updatedQuiz.questions[questionIndex].text = e.target.value;
        }
        setEditingData(updatedQuiz);
    };

    const handleDeleteQuiz = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/quiz/quiz/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setQuizzes(quizzes.filter(quiz => quiz._id !== id));
            alert('Quiz deletado com sucesso!');
        } catch (err) {
            console.error('Erro ao deletar o quiz:', err.response?.data || err.message);
            alert('Erro ao deletar o quiz.');
        }
    };

    const handleCopyUrl = (id) => {
        const quizUrl = `${window.location.origin}/quiz/${id}`;
        navigator.clipboard.writeText(quizUrl).then(() => {
            alert('URL copiada para a área de transferência');
        }, (err) => {
            console.error('Erro ao copiar a URL:', err);
            alert('Erro ao copiar a URL.');
        });
    };

    return (
        <div className="quizzes-page">
            <Sidebar/>
            <h1>Quizzes Criados</h1>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id} className="quiz-card">
                        <div className="quiz-title">{quiz.title}</div>
                        <div className="quiz-summary">
                            {quiz.questions.length > 0 ? (
                                quiz.questions.map((question, questionIndex) => (
                                    <div key={questionIndex} className="question-block">
                                        {editingQuizId === quiz._id ? (
                                            <input
                                                type="text"
                                                value={editingData.questions[questionIndex].text}
                                                onChange={(e) => handleChange(e, questionIndex)}
                                                placeholder='Informe a sua pergunta'
                                            />
                                        ) : (
                                            <p className="question-text">{question.text}</p>
                                        )}
                                        <ul className="answer-list">
                                            {question.answers.map((answer, answerIndex) => (
                                                <li key={answerIndex} className="answer-text">
                                                    {editingQuizId === quiz._id ? (
                                                        <input
                                                            type="text"
                                                            value={editingData.questions[questionIndex].answers[answerIndex].text}
                                                            onChange={(e) => handleChange(e, questionIndex, answerIndex)}
                                                            placeholder='Informe a resposta'
                                                        />
                                                    ) : (
                                                        <span>{answer.text}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma pergunta disponível</p>
                            )}
                        </div>
                        <div className="quiz-actions">
                            {editingQuizId === quiz._id ? (
                                <button onClick={() => handleSaveQuiz(quiz._id)} className="quiz-action-button">Salvar</button>
                            ) : (
                                <button onClick={() => handleEditQuiz(quiz)} className="quiz-action-button">Editar</button>
                            )}
                            <button onClick={() => handleDeleteQuiz(quiz._id)} className="quiz-action-button">Deletar</button>
                            <button onClick={() => handleCopyUrl(quiz._id)} className="quiz-action-button">Copiar URL</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;
