

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/clinica_back/', // URL base do Symfony
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createPaciente = (data) => {
    return api.post('/paciente', data);
};

export default api;

createPaciente(formData)
    .then(response => {
        console.log("Resposta recebida:", response);
    })
    .catch(error => {
        console.error("Erro ao enviar dados:", error.response || error.message);
    });

