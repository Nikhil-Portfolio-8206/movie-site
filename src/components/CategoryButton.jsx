import PropTypes from 'prop-types';

const CategoryButton = ({ category, onCategoryClick }) => {
  if (!category || typeof onCategoryClick !== 'function') return null;

  return (
    <button
      className="p-2 px-4 bg-gray-800 text-white rounded-lg mx-2 transition-transform transform duration-300 hover:bg-blue-500 hover:scale-105"
      onClick={() => onCategoryClick(category)}
    >
      {category}
    </button>
  );
};

// PropTypes validation
CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,  // category should be a required string
  onCategoryClick: PropTypes.func.isRequired,  // onCategoryClick should be a required function
};

export default CategoryButton;
