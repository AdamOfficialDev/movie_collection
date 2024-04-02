// App.js
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieForm from "./components/MovieForm";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);

  // Fetch movies from localStorage on component mount
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  // Update localStorage whenever movies state changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Function to add new movie
  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  // Function to delete movie
  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  // Function to edit movie
  const editMovie = (id, updatedMovie) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <MovieForm addMovie={addMovie} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              deleteMovie={deleteMovie}
              editMovie={editMovie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
