import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "{create your own API key}"
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"

const Card = ({ img }) => (
  <img className='card' src={ img } alt="cover" />
)

const Row = ({ title, arr = [

] }) =>(

  <div className='row'>
    <h2>{title}</h2>
  <div>{
    arr.map((item, index)=>(
      <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
    ))
    }
    </div>

  </div>

)

const Home = () => {

  const [upcomingMovies, setupcomingMovies] = useState([])
  const [nowPlayingMovies, setnowPlayingMovies] = useState([])
  const [popularMovies, setpopularMovies] = useState([])
  const [topRatedMovies, settopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])

  useEffect(()=>{
    const fetchUpcoming = async() => {
      const{ data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=3`)
      setupcomingMovies(results)
    };
    fetchUpcoming();
    const fetchnowPlaying = async() => {
      const{ data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=2`)
      setnowPlayingMovies(results)
    };
    fetchnowPlaying();
    const fetchPopular = async() => {
      const{ data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setpopularMovies(results)
    };
    fetchPopular();
    const fetchtopRated = async() => {
      const{ data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      settopRatedMovies(results)
    };
    fetchtopRated();
    const getAllGenre = async() => {
      const{ data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)
    };
    getAllGenre();
  }, [])

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[4]? `url(${`${imgUrl}/${popularMovies[4].poster_path}`})`:"none"
      }}>
        {
          popularMovies[0] && 
          (
            <h1>{popularMovies[4].original_title}</h1>
          )
        }
        {
          popularMovies[0] && 
          (
        <p>{popularMovies[4].overview}</p>
            )
        }
        <div>
          <button>Play <BiPlay /></button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>

      <Row title={"upcomingMovies"} arr={upcomingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"TV Shows"} arr={topRatedMovies} />
      <Row title={"Movies"} arr={nowPlayingMovies} />
      <div className="genreBox">
        {genre.map((item)=>(
          <Link key={item.id} to="">{item.name}</Link>
        ))}
      </div>
    </section>
  )
}

export default Home
