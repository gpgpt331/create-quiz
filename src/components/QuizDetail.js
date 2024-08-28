import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../assets/QuizDetail.css';
import '../assets/CommentsSection.css';
import Modal from 'react-modal';
import { Oval } from 'react-loader-spinner';

const QuizDetail = () => {
    const { id } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/roleta.png'; // Substitua pelo caminho correto da sua imagem
      };


    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/quiz/quiz/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setQuiz(response.data);
                setTimeLeft(1800); // Reset timer to 30 minutes
            } catch (error) {
                setError('Erro ao buscar quiz');
                console.error('Erro ao buscar quiz:', error.response?.data || error.message);
            }
        };

        fetchQuiz();
    }, [id]);

    useEffect(() => {
        let intervalId;

        if (timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);

    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleAnswerOptionClick = () => {
        // Move to the next question
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Handle the end of the quiz
            setModalIsOpen(true);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                // Aqui você pode adicionar lógica para redirecionar ou realizar outra ação
            }, 3000); // Simula 3 segundos de carregamento
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!quiz) {
        return <div>Carregando...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const handleCloseModal = () => {
        let redirectLink = quiz.thankYouLink;
    
        // Verifica se o link começa com 'http://' ou 'https://'
        if (!/^https?:\/\//i.test(redirectLink)) {
            redirectLink = 'http://' + redirectLink; // Adiciona 'http://' se não estiver presente
        }
    
        // Redireciona o usuário para o link informado
        window.location.href = redirectLink;
        
        // Fecha o modal
        setModalIsOpen(false);
    };

    return (
        <div className="quiz-container-page">
            <img className='quiz-logo' src={`/${quiz.logo}`} alt="Logo do Quiz" />
            <div className="quiz-timer">
                <p>A promoção termina em:</p>
                <div className="quiz-countdown">{formatTime(timeLeft)}</div>
            </div>
            <div className="quiz-content">
                <h2>{quiz.title}</h2>
                <p>Queremos descobrir o quão sortudo(a) você é! Participe de nossa avaliação e ganhe duas chances para girar nossa Roleta de Prêmios Especiais da nossa campanha da semana do consumidor.</p>
            </div>
            <div className="quiz-question-section">
                {currentQuestion && (
                    <>
                        <h3>Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</h3>
                        <p>{currentQuestion.text}</p>
                        <div className="quiz-options">
                            {currentQuestion.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={handleAnswerOptionClick}
                                    className="quiz-option-button"
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <CommentsSection />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Quiz Concluído"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                {loading ? (
                    <div className="loader-container">
                        <Oval
                            height={80}
                            width={80}
                            color="#4fa94d"
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                        <p>Carregando resultados...</p>
                    </div>
                ) : (
                    <div>
                        <h2>{quiz.thankYouTitle}</h2>
                        <p>{quiz.thankYouMessage}</p>
                        {/* Exibindo a imagem dentro do modal */}
                        <div id='rolette'>
                        <img 
        src="/roleta.png" // Substitua pelo caminho correto da sua imagem
        alt="Imagem de Download"
        style={{ maxWidth: '100%', height: 'auto', margin: '20px 0px 0px 5px', justifyContent:"center", display: "flex" }}
      /></div>

                        <button onClick={handleCloseModal}>Continuar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

const CommentsSection = () => {
    const [comments, setComments] = useState([
        { id: 1, name: 'Allison Santiago', text: 'Olá, pode me dizer como funciona e quanto tempo demorou a entrega?', time: '6 horas', likes: 23, replies: [
            { id: 2, name: 'Jorge de Aguiar', text: 'Olá, é só responder o formulário de 3 perguntas e você vai ganhar 1 chance para girar a roleta. Eu já ganhei meu prêmio e estou aguardando a entrega', time: '2 horas', likes: 62, replies: [] },
        ]},
        { id: 3, name: 'Antonella Balestero', text: 'Recebi meu mimo do perfume Lily e o Malbec em 2 dias!', time: '17 minutos', likes: 121, image: 'oboticario_box.png', replies: [
            { id: 4, name: 'O Boticário', text: 'Obrigado pelo seu feedback!', time: '1 minuto', likes: 1, replies: [] }
        ]},
        { id: 5, name: 'Renata Pontes', text: 'Quero compartilhar meu resultado. Visitei o site, preenchi um questionário e tive a oportunidade de girar a roleta e conseguir um prêmio!', time: '1 minuto', likes: 0, replies: [] },
    ]);
    
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            setComments([{ id: comments.length + 1, name: 'Seu Nome', text: newComment, time: 'Agora', likes: 0, replies: [] }, ...comments]);
            setNewComment("");
        }
    };

    return (
        <div className="comments-section">
            <h3>Comentários:</h3>
            <div className="comment-input">
                <input 
                    type="text" 
                    placeholder="Escreva seu comentário" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                />
                <button onClick={handleAddComment}>Publicar</button>
            </div>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-content">
                            <p><strong>{comment.name}</strong> {comment.text}</p>
                            {comment.image && <img src={comment.image} alt="Comentário imagem" className="comment-image" />}
                            <div className="comment-actions">
                                <span>{comment.time}</span>
                                <span>Curtir</span>
                                <span>Responder</span>
                                <span>❤ {comment.likes}</span>
                            </div>
                        </div>
                        {comment.replies && comment.replies.map(reply => (
                            <div key={reply.id} className="comment-reply">
                                <p><strong>{reply.name}</strong> {reply.text}</p>
                                <div className="comment-actions">
                                    <span>{reply.time}</span>
                                    <span>Curtir</span>
                                    <span>Responder</span>
                                    <span>❤ {reply.likes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizDetail;
