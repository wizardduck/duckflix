import './header.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


import api from '../../services/api';

function Header(){

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function searchMovies() {
            if(search.length < 2){
                setMovies([]);
                return;
            }
            
            try{
                const response = await api.get('/search/movie', {
                    params:{
                        query: search,
                    }
                });

                setMovies(response.data.results);
            }catch(error){
                console.log(error);
            }
        }

        const delayDebounce = setTimeout(()=>{
            searchMovies();
        },500);

        return()=> clearTimeout(delayDebounce);

    },[search])
    

    return(
        <header className='header'>

            <div className='header-left'>
                <Link to='/' className='logo'>DuckFlix</Link>
            </div>

            <nav className='header-center'>
                <Link to='/' className='logo'>Home</Link>
                
                <Link to='/favorites' className='logo'>Favoritos</Link>
            </nav>

            <div className='header-right'>
                <div className='search-box'>
                    <input
                    type='text'
                    placeholder='Buscar filmes...'
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    onFocus={()=> setShowDropdown(true)}  
                    onBlur={()=> {
                        setTimeout(()=>{
                            setShowDropdown(false);
                        },200);
                    }}                  
                    />

                    {showDropdown && movies.length > 0 && (
                        <div className='search-dropdown'>

                            {
                                movies.map((movie)=>{

                                    const image = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

                                    return(
                                        <Link 
                                        key={movie.id}
                                        to={`/movies/${movie.id}`}
                                        className='search-item'
                                        onClick={()=>{
                                            setShowDropdown(false);
                                            setSearch("");
                                        }}
                                        >
                                            <img src={image}
                                            alt={movie.title}
                                            />

                                            <div>
                                                <span>
                                                    {movie.title}
                                                </span>

                                                <p>
                                                    {movie.release_date?.split("-")[0]}
                                                </p>

                                            </div>

                                        
                                        </Link>
                                    )

                                })

                            
                            }

                        </div>

                    )}
                </div>
            </div>

        </header>
    )

}


export default Header;