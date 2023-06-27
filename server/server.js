const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500; // Porta em que o servidor será executado

// Middleware para habilitar o CORS
app.use(cors());

// Endpoint para a operação de save
app.post('/save', (req, res) => {
  // Aqui você pode processar os dados recebidos do jogo e armazená-los
  // em algum formato, como JSON ou em um banco de dados
  // Você pode enviar uma resposta de sucesso ou erro de volta para o jogo
  res.send('Save successful');
});

// Endpoint para a operação de load
app.get('/load', (req, res) => {
  // Aqui você pode buscar os dados salvos e enviá-los de volta para o jogo
  // em um formato adequado, como JSON
  // Você pode enviar os dados salvos ou uma resposta de erro de volta para o jogo
  res.json({ playerLives: 12, enemyLives: [10, 10, 10] });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});