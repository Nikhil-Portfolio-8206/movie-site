import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// ✅ Fix: Add fetchMovies function
export const fetchMovies = async (category = "popular") => {
  const categoryMap = {
    popular: "popular",
    "top rated": "top_rated",
    upcoming: "upcoming",
  };

  const endpoint = categoryMap[category.toLowerCase()] || "popular"; // Default to popular

  try {
    const response = await api.get(`/movie/${endpoint}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/search/movie`, {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error.response?.data || error.message);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: { append_to_response: "credits,videos,images" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.response?.data || error.message);
    return null;
  }
};
