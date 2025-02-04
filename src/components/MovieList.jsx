// src/components/MovieList.jsx
import { useState } from 'react';
import SearchBar from './SearchBar';
import movieData from '../movieData';

const MovieList = () => {
  const [category, setCategory] = useState('All'); // Default category is 'All'
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

  // Filter movies by category and search query
  const filteredMovies = movieData.filter(
    (movie) =>
      (category === 'All' || movie.category === category) &&
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())  // Filter by search query
  );

  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query when SearchBar is used
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Category Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setCategory('All')}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 transition-all duration-300 hover:bg-blue-600"
        >
          All
        </button>
        <button
          onClick={() => setCategory('Sci-Fi')}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 transition-all duration-300 hover:bg-blue-600"
        >
          Sci-Fi
        </button>
        <button
          onClick={() => setCategory('Horror')}
          className="px-4 py-2 bg-blue-500 text-white rounded transition-all duration-300 hover:bg-blue-600"
        >
          Horror
        </button>
      </div>

      {/* Movie Posters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="relative group">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto rounded-lg transition-all duration-300 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
