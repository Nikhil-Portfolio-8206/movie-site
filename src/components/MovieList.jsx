import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { fetchMovies } from '../api/api'; // Adjust the path based on your folder structure

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const fetchedMovies = await fetchMovies(category);
      setMovies(fetchedMovies);
      setLoading(false);
    };

    loadMovies();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item border p-2 rounded-lg shadow-lg">
              <h3 className="text-center text-lg font-semibold">{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

// Add PropTypes validation for 'category' prop
MovieList.propTypes = {
  category: PropTypes.string.isRequired, // category should be a required string
};

export default MovieList;



