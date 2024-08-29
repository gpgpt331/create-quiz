import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const MyQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/quiz', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setQuizzes(res.data);
            } catch (err) {
                console.error('Erro ao buscar quizzes:', err.response.data);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="quiz-page">
            <Sidebar />
            <div className="quiz-container">
                <h1>Meus Quizzes</h1>
                {quizzes.length > 0 ? (
                    <ul>
                        {quizzes.map((quiz, index) => (
                            <li key={index}>
                                <h3>Quiz {index + 1}</h3>
                                {quiz.questions.map((q, qIndex) => (
                                    <div key={qIndex}>
                                        <p><strong>Pergunta {qIndex + 1}:</strong> {q.question}</p>
                                        <ul>
                                            {q.answers.map((answer, aIndex) => (
                                                <li key={aIndex}>{answer}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Você ainda não criou nenhum quiz.</p>
                )}
            </div>
        </div>
    );
};

export default MyQuizzes;
