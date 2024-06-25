const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const DB_PATH = path.join(__dirname, 'recipes.db');

// Initialize SQLite database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    createTable(); // Call the function to create the table
  }
});

// Function to create the recipes table if it doesn't exist
const createTable = () => {
  const createRecipesTableSQL = `
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      category TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  db.run(createRecipesTableSQL, (err) => {
    if (err) {
      console.error('Error creating recipes table:', err.message);
    } else {
      console.log('Recipes table created or already exists.');
    }
  });
};

// Function to get all recipes from the database
const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM recipes';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to add a new recipe to the database
const addRecipe = (title, description, image, category) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO recipes (title, description, image, category)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [title, description, image, category], function(err) {
      if (err) {
        reject(err);
      } else {
        // Return the newly inserted row id
        resolve({ 
          id: this.lastID, 
          title, 
          description, 
          image, 
          category 
        });
      }
    });
  });
};

// Close the database connection when Node process exits
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
});

module.exports = {
  getAllRecipes,
  addRecipe
};
