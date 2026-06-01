
import "./home.css";
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import api from '../../services/api';

import Hero from '../../components/Hero';
import MovieCard from '../../components/MovieCard';
import Header from '../../components/Header'

///movie/now_playing?api_key=87b1c3134250030996f1caabeead787a&language=pt-BR


function Home(){
    
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [featuredDetails, setFeaturedDetails] = useState(null);
    const [certification, setCertification] = useState("");
    const [trailer, setTrailer] = useState(null);
    const navigate = useNavigate();
    

    const carouselRef = useRef(null);

    useEffect(()=>{

        async function loadMovies(){
            try{
                const response = await api.get("/movie/now_playing");

                setMovies(response.data.results);
                setFilteredMovies(response.data.results);
                setFeaturedMovie(response.data.results[0]);
            }catch(error){
                console.log(error);
            }
        }

        loadMovies();
    },[]);
    
    useEffect(() => {

        const interval = setInterval(()=>{
            if(carouselRef.current){
                carouselRef.current.scrollLeft += 220;

                if(
                    carouselRef.current.scrollLeft >=
                    carouselRef.current.scrollWidth - 
                    carouselRef.current.clientWidth
                ){
                    carouselRef.current.scrollLeft = 0;
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    },[])

    useEffect(()=>{
        async function loadFeaturedDetails(){

            if(!featuredMovie) return;

            try{
                const detailsResponse = await api.get(`/movie/${featuredMovie.id}`);

                setFeaturedDetails(detailsResponse.data);

                const releaseResponse = await api.get(`/movie/${featuredMovie.id}/release_dates`);
                const br = releaseResponse.data.results.find(
                    item => item.iso_3166_1 === 'BR'
                );

                if(br && br.release_dates.length > 0){
                    setCertification(br.release_dates[0]
                        .certification || "L");
                }else{
                    setCertification("L")
                }

                const videoResponse = await api.get(`/movie/${featuredMovie.id}/videos`);

            const trailerData =
            videoResponse.data.results.find(
                (video) =>
                    video.site === "YouTube"
            );

            if(trailerData){

                setTrailer(trailerData.key);
            }

            }catch(error){
                console.log(error);
            }
        }

        loadFeaturedDetails();

    }, [featuredMovie])

    if(!featuredMovie){
        return(
            <div className="loading">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return(

        <div className="container">
           <Header/>

           <Hero 
           movie={featuredMovie}
           details={featuredDetails}
           certification={certification}
           trailer={trailer}
           />



           <section className="carousel" ref={carouselRef}>

            {
                filteredMovies.map((movie)=> (
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    setFeaturedMovie={setFeaturedMovie}
                    />
                ))
            }

           </section>

        </div>
    )
}



export default Home;
