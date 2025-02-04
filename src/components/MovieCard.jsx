import { useState } from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-auto transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
      />

      {/* Hover effect: Show Video Preview */}
      {isHovered && movie.videoUrl && (
        <video
          src={movie.videoUrl}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-90"
        />
      )}

      {/* Movie Title Overlay */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-sm rounded">
        {movie.title}
      </div>
    </div>
  );
};

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    videoUrl: PropTypes.string, // Optional, since some movies might not have a preview
  }).isRequired,
};

export default MovieCard;
