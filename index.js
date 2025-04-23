const express = require('express');
const app = express();
const path = require('path');
const clientesRoute = require('./routes/clientes');

// Middleware para servir arquivos estáticos (HTML, JS, CSS...)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas da API (clientes)
app.use('/clientes', clientesRoute);

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});