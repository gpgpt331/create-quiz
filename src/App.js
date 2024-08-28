import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Planos from './pages/Planos';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/Settings';
import Quiz from './pages/Quiz'; 
import QuizDetail from './components/QuizDetail';
import EditQuiz from './components/EditQuiz';
import Quizzes from './pages/Quizzes';
import Models from './pages/Models';
import CreatePlan from './pages/CreatePlan';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} /> 
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/planos" element={<Planos />} />
                <Route path="/createplan" element={<CreatePlan />} />
                <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} /> {/* Nova rota para o Quiz */}
                <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
                <Route path="/create-quiz" element={<Quiz />} />
                <Route path="/quiz/:id" element={<QuizDetail />} />
                <Route path="/quizzes" element={< Quizzes/>} />
                <Route path="/models" element={<Models />} />
                <Route path="/edit-quiz/:id" component={EditQuiz} />

                

            </Routes>
        </Router>
    );
}

export default App;
