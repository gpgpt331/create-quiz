import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/config';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload bem-sucedido!');
      setUploadedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setUploadStatus('Erro ao fazer upload.');
    }
  };

  return (
    <div>
      <h2>Upload de Imagem</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Pré-visualização" style={{ width: '200px', marginTop: '10px' }} />}
        <button type="submit">Enviar Imagem</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      {uploadedImageUrl && (
        <div>
          <h3>Imagem enviada:</h3>
          <img src={uploadedImageUrl} alt="Imagem enviada" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
