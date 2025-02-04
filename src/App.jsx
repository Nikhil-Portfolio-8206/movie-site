// src/App.jsx
import MovieList from './components/MovieList'; // Import the MovieList component

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-4xl font-semibold py-6">Movies Database</h1>
      <MovieList />  {/* Display the MovieList component */}
      <footer className="text-center text-sm font-semibold m-4">Created by Nikhil-this project is under development</footer>
    </div>
    
  );
}

export default App;
