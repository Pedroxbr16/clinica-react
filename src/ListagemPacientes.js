import React, { useEffect, useState } from 'react';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Chama a API para buscar os pacientes
    fetch('http://seu-servidor/api/pacientes.php')
      .then(response => response.json())
      .then(data => setPacientes(data));
  }, []);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Pacientes Cadastrados</h2>
      <input
        type="text"
        placeholder="Buscar paciente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente, index) => (
            <tr key={index}>
              <td>{paciente.nome}</td>
              <td>{paciente.cpf}</td>
              <td>{paciente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Cadastrar Paciente</button>
    </div>
  );
}

export default Pacientes;
