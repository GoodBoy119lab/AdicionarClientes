const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'db', 'clientes.json');

// Função para ler os clientes
function lerClientes() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Função para salvar clientes
function salvarClientes(clientes) {
  fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));
}

// GET /clientes
router.get('/', (req, res) => {
  const clientes = lerClientes();
  res.json(clientes);
});

// POST /clientes
router.post('/', (req, res) => {
  const { nome, email, empresa } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
  }

  const clientes = lerClientes();

  // Verifica se o email já existe
  const emailExistente = clientes.find(c => c.email === email);
  if (emailExistente) {
    return res.status(409).json({ erro: 'Este email já está cadastrado.' });
  }

  const novoCliente = {
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    nome,
    email,
    empresa
  };

  clientes.push(novoCliente);
  salvarClientes(clientes);

  res.status(201).json(novoCliente);
});

module.exports = router;