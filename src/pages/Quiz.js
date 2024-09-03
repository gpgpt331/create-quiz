import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../assets/Quiz.css';
import API_URL from '../utils/config';
import getPlano from '../utils/getPlano';

const Quiz = () => {

    const validadePlano = getPlano

    const [quizData, setQuizData] = useState({
        title: '',
        thankYouTitle: '',
        thankYouMessage: '',
        thankYouLink: '',
        questions: []
    });
    
    

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...quizData.questions];
        newQuestions[index].text = event.target.value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const handleAnswerChange = (qIndex, aIndex, event) => {
        const newQuestions = [...quizData.questions];
        newQuestions[qIndex].answers[aIndex].text = event.target.value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, { text: '', answers: [{ text: '' }] }]
        });
    };

    const addAnswer = (index) => {
        const newQuestions = [...quizData.questions];
        newQuestions[index].answers.push({ text: '' });
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!validadePlano) {
            setError('Assine um plano para poder criar um quiz');
            return;
        }

        if (!quizData.questions.length) {
            setError('O campo questions é obrigatório');
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            
            const formData = new FormData();
            formData.append('title', quizData.title);
            formData.append('thankYouTitle', quizData.thankYouTitle);
            formData.append('thankYouMessage', quizData.thankYouMessage);
            formData.append('thankYouLink', quizData.thankYouLink);
            formData.append('questions', JSON.stringify(quizData.questions));
    
            const res = await axios.post(`${API_URL}/api/quiz`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Quiz salvo:', res.data);
            setQuizData({
                title: '',
                thankYouTitle: '',
                thankYouMessage: '',
                thankYouLink: '',
                questions: []
            });
            setSuccessMessage('Quiz cadastrado com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar quiz:', err.response?.data || err.message);
            setError('Ocorreu um erro ao cadastrar o quiz. Tente novamente.');
        }
    };
    

    return (
        <div className="quiz-page">
            <Sidebar />
            <div className="quiz-container">
                { (validadePlano) } 
                <h1>Crie seu Quiz</h1>
                <form onSubmit={handleSubmit} className='form-quiz'>
                    <div>
                        <label>Título</label>
                        <input
                            type="text"
                            value={quizData.title}
                            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
    </div>

                    {quizData.questions.map((q, qIndex) => (
                        <div key={qIndex} className="question-block">
                            <label>Pergunta {qIndex + 1}:</label>
                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                required
                            />
                            {q.answers.map((answer, aIndex) => (
                                <div key={aIndex} className="answer-block">
                                    <label>Resposta {aIndex + 1}:</label>
                                    <input
                                        type="text"
                                        value={answer.text}
                                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                        placeholder="Digite a resposta"
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addAnswer(qIndex)}
                                className="add-button"
                            >
                                Adicionar Resposta
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="add-button"
                    >
                        Adicionar Pergunta
                    </button>

                    <div>
                        <label className='label-modal'>Título de Agradecimento</label>
                        <input
                            type="text"
                            value={quizData.thankYouTitle}
                            onChange={(e) => setQuizData({ ...quizData, thankYouTitle: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Mensagem de Agradecimento</label>
                        <input
                            type='text'
                            value={quizData.thankYouMessage}
                            onChange={(e) => setQuizData({ ...quizData, thankYouMessage: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Link de Redirecionamento</label>
                        <input
                            type="text"
                            value={quizData.thankYouLink}
                            onChange={(e) => setQuizData({ ...quizData, thankYouLink: e.target.value })}
                        />
                    </div>

                    <div>
                        <button type="submit">Salvar Quiz</button>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Quiz;
