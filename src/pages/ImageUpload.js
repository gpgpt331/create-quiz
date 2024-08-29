// Settings.js
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../assets/ImageUpload.css';
import { useState } from 'react';


const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const userId = '12345'; // Substitua pelo ID real do usuário logado

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId); // Adicione o ID do usuário ao FormData
  
    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Erro ao enviar a imagem');
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};
export default ImageUpload;
