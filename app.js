const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const projetRoutes = require('./routes/projet');
const userRoutes = require('./routes/user');
mongoose.connect('mongodb+srv://matrixfoot:indus789456@cluster0-zghco.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  const app = express();
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use('/api/projet', projetRoutes);
  app.use('/api/auth', userRoutes);
  app.use(express.static(path.join(__dirname, 'images')));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'uploaded fiche'));
  })
  
 
  
  

module.exports = app;