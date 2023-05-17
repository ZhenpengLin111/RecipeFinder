const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

app.use(express.json());

app.post('/api/recipes', async (req, res) => {
    console.log('Received request to /api/recipes');

    const { nutrients } = req.body;
    api_key = "4f630803698b4cbd930e7660732d2328";
    const url = `https://api.spoonacular.com/recipes/findByNutrients?${new URLSearchParams(nutrients)}`;

    const response = await axios.get(url, {
        headers: {
            "x-api-key": api_key
        }
    });
    const data = response.data;
    const recipes = data.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        calories: recipe.calories,
        protein: recipe.protein,
        fat: recipe.fat,
        carbs: recipe.carbs
    }));
    console.log(recipes);
    res.json(recipes);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
