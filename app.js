const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./utils/db'); // Importation de la connexion à la base de données

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(cors()); // Autorise les requêtes cross-origin
app.use(bodyParser.json()); // Parse les requêtes JSON

// Routes
const appointmentRoutes = require('./src/routes/appointmentRoute');
//const userRoutes = require('./src/routes/userRoutes');

app.use('/api/appointments', appointmentRoutes);
//app.use('/api/users', userRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes seront ajoutées ici plus tard
app.get('/test', async (req, res) => {
  try {
    const client = await db.query('SELECT NOW() as time');
    res.json({ time: client.rows[0].time });
  } catch (err) {
    console.error('Erreur de connexion à la base de données:', err);
    res.status(500).json({ error: 'Impossible de se connecter à la base de données' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // connect to db
  db.connect().then(() => {
    console.log("Connected to Postgres database")
  }).catch((e) => {
    console.error("Error: " + e)  })
});