import React from 'react';
import Sidebar from '../components/Sidebar';

const Models = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/roleta.png'; // Substitua pelo caminho correto da sua imagem
    link.download = 'roleta.png'; // Nome que o arquivo terá ao ser baixado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Sidebar />
      <h1>Baixe sua imagem</h1>
      <img 
        src="/roleta.png" // Substitua pelo caminho correto da sua imagem
        alt="Imagem de Download"
        style={{ maxWidth: '20%', height: 'auto', margin: '20px 0' }}
      />
      <br />
      <button onClick={handleDownload} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Baixar Imagem
      </button>
    </div>
  );
};

export default Models;
