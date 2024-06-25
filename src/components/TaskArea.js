import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel } from '@mui/material';
import { fetchRecipes, createRecipe } from '../utils/api';

const TaskArea = () => {
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    image: '',
    category: '' // New state for category
  });

  useEffect(() => {
    const getRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    };
    getRecipes();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRecipe(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const addedRecipe = await createRecipe(newRecipe);
    setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
    setNewRecipe({ title: '', description: '', image: '', category: '' }); // Clear category after submission
    handleClose();
  };

  return (
    <div style={{ padding: 24, flex: 1 }}>
      <Typography variant="h4" gutterBottom>
        Recipes
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Recipe
      </Button>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt="Recipe"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {recipe.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Recipe Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newRecipe.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Recipe Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newRecipe.description}
            onChange={handleChange}
          />
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={newRecipe.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            style={{ marginTop: 10 }}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="South">South</MenuItem>
            <MenuItem value="North">North</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
            {/* Add other categories as needed */}
          </Select>
          <Button
            variant="contained"
            component="label"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {newRecipe.image && (
            <img src={newRecipe.image} alt="Recipe" style={{ marginTop: 10, width: '100%' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskArea;
