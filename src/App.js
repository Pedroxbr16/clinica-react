import React from 'react';
import Sidebar from './sidebar'; // Importa o componente Sidebar
import './App.css'; // Importa os estilos 

function App() {
  return (
    <div className="app">
      <Sidebar />  {/* Renderiza o Sidebar */}
      <div className="content">
        <h1>Clínica blablabla</h1>       
      </div>
    </div>
  );
}

export default App;
