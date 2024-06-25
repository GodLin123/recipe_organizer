const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../db/database.js');


const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../public/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  startServer(); // Start Express server when Electron is ready
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Backend API setup
function startServer() {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());

  server.get('/recipes', async (req, res) => {
    const recipes = await db.getAllRecipes();
    res.json(recipes);
  });

  server.post('/recipes', async (req, res) => {
    const { title, description, image,category } = req.body;
    const newRecipe = await db.addRecipe(title, description, image,category);
    res.json(newRecipe);
  });

  server.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}
