
import './hero.css';
import { FaPlay } from "react-icons/fa";

function Hero({ movie, details, certification, trailer }){

    const background = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const year = movie.release_date?.split("-")[0];
    const runtime = details?.runtime;

    return(
        <section className='hero' style={{backgroundImage:`url(${background})`,}} >

            <div className='content'>
                
             <h1>{movie.title}</h1>

             <div className='movie-info'>

                <span className='rating'>{certification}</span>

                <span>{year}</span>

                {
                    runtime && (
                        <span> {runtime} min </span>
                    )
                }

             </div>

             <p>{movie.overview}</p>

             <button onClick={() => {

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

            </div>

        </section>

    )

}

export default Hero;