
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { IoInformationCircleOutline } from 'react-icons/io5';
import './favorites.css';
import { toast } from 'react-toastify';

import Header from '../../components/Header';

function Favoritos(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
       
        const minhaLista = localStorage.getItem('@duckflix');
        setMovies(JSON.parse(minhaLista) || [])
    }, [])

     const background = movies.length > 0 ? `https://image.tmdb.org/t/p/original${movies[0].backdrop_path}` : '';

     function excluirFilme(id){
        let filtroFilmes = movies.filter((item)=>{
            return(item.id !== id)
        })

        setMovies(filtroFilmes);
        localStorage.setItem('@duckflix', JSON.stringify(filtroFilmes));
        toast.success('FILME EXCLUIDO COM SUCESSO')
     }

     if(movies.length === 0){
        return(
            <>
            <Header/>
        
                <div className='empty-state'>
                    <h2>Nenhum filme adicionado</h2>

                    <p>Explore nossa coleçao e adicione seus filmes favoritos!</p>
                </div>
            </>

        )
     }else{
        return(
        <>
        <Header/>
            
        
        <div className='main' style={{backgroundImage: background ? `url(${background})` : 'none' }}>

            <div className='favorites-overlay'>
                <h1>Meus Filmes</h1>

                <ul className='favorites-list'>
                    {movies.map((item)=>{
                        return(
                            <li key={item.id}>
                                <span>{item.title}</span>
                                <div>
                                    <Link to={`/movies/${item.id}`}><IoInformationCircleOutline size={22}/></Link>
                                    <button onClick={()=> excluirFilme(item.id)}>
                                        <MdDelete size={22} />
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>


        </div>
       </>
     )}
}

export default Favoritos;