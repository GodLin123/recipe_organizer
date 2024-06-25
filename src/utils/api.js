import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

export const createRecipe = async (recipe) => {
  const response = await axios.post(`${API_URL}/recipes`, recipe);
  return response.data;
};
