import { useState, useEffect } from "react";
import { searchMovies, fetchMovies } from "./api/api"; // ✅ Corrected import
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import CategoryButton from "./components/CategoryButton";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("popular");

  // Fetch movies based on category
  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      setError(null);
      setResults([]); // Clear previous results before fetching new data

      console.log("Fetching movies for category:", category); // Log category for debugging

      try {
        const movies = await fetchMovies(category); // Ensure category is passed correctly
        setResults(movies);
      } catch (error) {
        console.error("Error fetching movies:", error); // Log any errors
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [category]); // Runs when category changes

  // Handle search input
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]); // Clear previous results

    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch {
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Clicking the title resets to "popular" category */}
      <h1 className="text-center text-4xl font-semibold py-6 cursor-pointer" onClick={() => setCategory("popular")}>
        Movies Database
      </h1>

      {/* Category buttons now work correctly */}
      <div className="flex justify-center space-x-4 mb-4">
        {["popular", "top_rated", "upcoming"].map((cat) => (
          <CategoryButton
            key={cat}
            category={cat}
            onCategoryClick={() => setCategory(cat)} // Update category when clicked
          />
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Search</button>
      </form>

      {/* Loading and error states */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display movie results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <MovieList category={category} />
      )}

      {/* Footer */}
      <footer className="text-center text-sm font-semibold m-4">
        Created by Nikhil - this project is under development
      </footer>
    </div>
  );
};

export default App;




