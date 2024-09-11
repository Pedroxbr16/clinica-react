import React, { useState } from 'react';
import './css/ConfigADM.css';

const ConfigADM = () => {
  const [types, setTypes] = useState(['Consulta Geral', 'Exame', 'Retorno']); // Array inicializado
  const [newType, setNewType] = useState(''); // Estado para o valor do novo tipo de consulta

  const handleAddType = () => {
    if (newType.trim()) { // Verifica se o campo não está vazio
      setTypes([...types, newType]);
      setNewType(''); // Limpa o campo de texto após adicionar
    }
  };

  const handleRemoveType = (indexToRemove) => {
    setTypes(types.filter((_, index) => index !== indexToRemove)); // Remove o tipo de consulta
  };

  return (
    <div className="config-adm-container">
      <h2>Gerenciar Tipos de Consulta</h2>
      
      <ul className="type-list">
        {types.map((type, index) => (
          <li key={index}>
            {type}
            <button onClick={() => handleRemoveType(index)}>Remover</button>
          </li>
        ))}
      </ul>
      
      <div className="add-type-container">
        <input 
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Digite o novo tipo de consulta..."
        />
        <button onClick={handleAddType} className="add-type-button">Adicionar</button>
      </div>
    </div>
  );
};

export default ConfigADM;
