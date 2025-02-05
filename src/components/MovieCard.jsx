import PropTypes from 'prop-types';
import { useState } from 'react';

const MovieCard = ({ movie, showCategoryButtons = false, onCategoryChange }) => {
  const [hovered, setHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750"; // Fallback image

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop in case the fallback image fails
    e.target.src = "https://via.placeholder.com/500x750"; // Fallback to placeholder on error
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden group" // Added 'group' class for hover effects
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={posterUrl}
        alt={movie.poster_path ? movie.title : "Image not available"}
        className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Smooth scale on hover
        onError={handleImageError}
      />

      {/* Hover popup content */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${hovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <h3 className="text-xl font-bold">{movie.title}</h3>
        <p className="text-sm text-center">
          {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No description available.'}
        </p>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-600">{movie.release_date}</p>

        {showCategoryButtons && onCategoryChange && (
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
              onClick={() => onCategoryChange("popular")}
            >
              Popular
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded-md"
              onClick={() => onCategoryChange("top_rated")}
            >
              Top Rated
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => onCategoryChange("upcoming")}
            >
              Upcoming
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string, // Added to support hover content
  }).isRequired,
  showCategoryButtons: PropTypes.bool,
  onCategoryChange: PropTypes.func,
};

export default MovieCard;

