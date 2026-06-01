
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import './movies.css';

import Header from "../../components/Header";
import MovieInfo from '../../components/MovieInfo';

function Movie(){

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    
    
    const [certification, setCertification] = useState("");
    const [trailer, setTrailer] = useState(null);

   useEffect(()=>{

    async function loadMovie() {
        
        try{
            const response = await api.get(`/movie/${id}`);


            setMovie(response.data); 

            const releaseResponse = await api.get(`/movie/${id}/release_dates`);
            const br = releaseResponse.data.results.find(
                    item => item.iso_3166_1 === 'BR'
                );

                if(br && br.release_dates.length > 0){
                    setCertification(br.release_dates[0]
                        .certification || "L");
                }else{
                    setCertification("L")
                }
           
            const videoResponse = await api.get(`/movie/${id}/videos`);

            const trailerData =
            videoResponse.data.results.find(
                (video) =>
                    video.type === "Trailer" &&
                    video.site === "YouTube"
            );

            if(trailerData){

                setTrailer(trailerData.key);
            }
        
        }catch(error){
           console.log(error)
        }
    }

    loadMovie();
   },[id]);

       

   if(!movie){
    return <h1>Carregando...</h1>
   }

   const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

   const background = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

   return (
    <div className='container' style={{backgroundImage:`url(${background})`,}}>

        <Header/>

        <div className="overlay">

            <div className="info">
                <MovieInfo 
                    movie={movie}
                    certification={certification}
                    trailer={trailer}
                    />           
            </div>

            <div>
                <img src={poster} alt={movie.title} />
            </div>

        </div>

    </div>
   )

}

export default Movie;