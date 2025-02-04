import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, searchKeyword }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchKeyword} // Controlled input
        onChange={(e) => onSearch(e.target.value)}
        className="p-3 w-80 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// Define propTypes to ensure the onSearch function is passed correctly
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,  // Function for searching
  searchKeyword: PropTypes.string.isRequired, // Controlled input
};

export default SearchBar;
