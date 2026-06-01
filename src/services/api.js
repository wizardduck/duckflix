import axios from 'axios';


//Base da URL: https://api.themoviedb.org/3
//URL da API: /movie/now_playing?api_key=87b1c3134250030996f1caabeead787a&language=pt-BR

const api = axios.create({ 
    baseURL: 'https://api.themoviedb.org/3',    
    params:{
        api_key: process.env.REACT_APP_TMDB_KEY,
        language:'pt-br'
    }}
   

)

export default api;