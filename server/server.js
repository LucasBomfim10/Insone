const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500; // Porta em que o servidor será executado

// Middleware para habilitar o CORS
app.use(cors());

let playerLives = 8;
let enemyLives = [10, 10, 10, 10, 10, 10];

// Configuração para receber dados JSON
app.use(express.json());

// Endpoint para a operação de save
app.post('/save', (req, res) => {
  const { playerLives: newPlayerLives } = req.body;
  //const { enemyLives: newEnemyLives } = req.body;
  playerLives = newPlayerLives;
  //enemyLives = newEnemyLives;
  res.send('Save successful');
});

// Rota para enviar a quantidade de vida atual do jogador
app.get('/load', (req, res) => {
  const data = {
    playerLives,
    //enemyLives
  };
  res.json(data);
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});