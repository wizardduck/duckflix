
import './movieInfo.css';
import { FaPlay } from "react-icons/fa";
import { BsBookmarkPlus } from 'react-icons/bs'
import { toast } from 'react-toastify';

function MovieInfo({

    movie,
    certification,
    trailer

}){

    const year = movie.release_date?.split("-")[0];

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@duckflix');

        let filmeSalvo = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvo.some((filmeSalvo)=> filmeSalvo.id === movie.id)

        if(hasFilme){
            toast.warn('ESSE FILME JÁ ESTA SALVO');
            return;
        }

        filmeSalvo.push(movie);
        localStorage.setItem('@duckflix', JSON.stringify(filmeSalvo))
        toast.success('FILME SALVO COM SUCESSO!');
    };

    return(

        <div className="movie-info-container">

            <h1>
                {movie.title}
            </h1>


            <div className="movie-meta">

                <span className="age-rating">
                    {certification}
                </span>

                <span>
                    {year}
                </span>

                {
                    movie.runtime && (

                        <span>
                            {movie.runtime} min
                        </span>

                    )
                }

            </div>


            <p>
                {movie.overview}
            </p>
            

            <div className='buttons'>
                <button className='trailer' onClick={() => {

                    if(trailer){

                        window.open(
                            `https://www.youtube.com/watch?v=${trailer}`,
                            "_blank"
                        );
                    }
                }}           
                > <div className='faplay'><FaPlay/></div>
                    

                    <span>WATCH TRAILER</span>

                </button>

                <button className='add' onClick={salvarFilme}>
                    <BsBookmarkPlus />
                </button>

            </div>


           

        </div>
    )
}

export default MovieInfo;