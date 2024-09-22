import { useEffect, useState } from "react"
import './App.css'
import SearchIcon from './assets/search.svg'
import MovieCard from "./MovieCard"

const apiKey = import.meta.env.VITE_API_KEY

const API_URL = `http://www.omdbapi.com?apikey=${apiKey}`

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(()=> {
        searchMovies('The Matrix');
    }, [])

    return (
        <div className="app">
            <h1>Movie Browser</h1>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for movies" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt="search" onClick={()=> searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ): (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default App