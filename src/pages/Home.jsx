import { useState } from 'react';
import { movies } from '../data/movieData';  // Ensure correct path
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';

const Home = () => {
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchKeyword, setSearchKeyword] = useState('');  // Now used in <SearchBar>
  const [selectedCategory, setSelectedCategory] = useState(null); // Now used in <CategoryButton>

  // Handle search functionality
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword); // Update state when user types
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update state for active category
    const filtered = category
      ? movies.filter((movie) => movie.category.toLowerCase() === category.toLowerCase())
      : movies;
    setFilteredMovies(filtered);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} searchKeyword={searchKeyword} />

      {/* Category Buttons */}
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        {['Sci-Fi', 'Horror', 'Action', 'Drama', 'Comedy'].map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onCategoryClick={handleCategoryClick}
            isActive={selectedCategory === category} // Pass active state
          />
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-400">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
