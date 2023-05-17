import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './index.css'

function App() {
  const [nutrients, setNutrients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (nutrients.trim() === ''){
      setError('Please enter some nutrients.');
      return;
    }
    setLoading(true);

    try{
      const response = await axios.post('http://localhost:3001/api/recipes', { nutrients });
      setRecipes(response.data);
      console.log(response.data);
      setError('')
    } catch (error) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app-container'>
      <div className="App">
        <h1>Recipe Finder</h1>
        <form onSubmit={handleSearch}>
          <input
          type="text"
          placeholder="Enter nutrients"
          value={nutrients}
          onChange={(e) => setNutrients(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className='recipe-container'>  
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <div className="recipe-details">
            <h2>{recipe.title}</h2>
            <p>Calories: {recipe.calories}</p>
            <p>Protein: {recipe.protein}</p>
            <p>Fat: {recipe.fat}</p>
            <p>Carbs: {recipe.carbs}</p>
          </div>
          <img src={recipe.image} alt={recipe.title} />
        </div>
))}

      </div>
    </div>
  );
}

export default App;