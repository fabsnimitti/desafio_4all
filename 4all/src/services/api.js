import axios from 'axios';// importa-se a axios para fazer o link e as requisições http da nossa api
const api=axios.create({
baseURL:'http://dev.4all.com:3003',// criase o link apontando para o servidor que foi disponibilizado
timeout: 10000// timeout da api
});
export default api;