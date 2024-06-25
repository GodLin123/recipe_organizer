CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipe_id INTEGER,
  name TEXT NOT NULL,
  quantity TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
