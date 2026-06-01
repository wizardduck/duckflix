
import { Link } from 'react-router-dom'
import './moviecard.css'

function MovieCard({ movie, setFeaturedMovie }){

    if (!movie.poster_path){
        return null;
    }

    const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return(
        <Link to={`/movies/${movie.id}`} className='card' onMouseEnter={()=> setFeaturedMovie(movie)}> 
           <img src={image} alt={movie.title} /> 
        </Link>
    )
}

export default MovieCard;