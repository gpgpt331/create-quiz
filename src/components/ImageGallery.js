import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/config';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token'); // Pega o token de autenticação armazenado
        const response = await axios.get(`${API_URL}/api/my-images`, {
          headers: {
            Authorization: `Bearer ${token}` // Envia o token no cabeçalho
          }
        });
        setImages(response.data);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Minhas Imagens</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image._id} style={{ margin: '10px' }}>
            <img src={`${API_URL}${image.url}`} alt={image.filename} style={{ width: '200px' }} />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
