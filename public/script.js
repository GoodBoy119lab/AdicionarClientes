document.getElementById('cliente-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const mensagem = document.getElementById('mensagem');

  if (!nome || !email) {
    mensagem.textContent = "Nome e email são obrigatórios.";
    mensagem.className = "mt-4 text-center font-semibold text-red-600";
    mensagem.classList.remove('hidden');
    return;
  }

  const cliente = { nome, email, empresa };

  try {
    const response = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    const data = await response.json();

    if (response.status === 201) {
      mensagem.textContent = "Cliente cadastrado com sucesso!";
      mensagem.className = "mt-4 text-center font-semibold text-green-600";
      mensagem.classList.remove('hidden');
      event.target.reset();
    } else if (response.status === 409) {
      mensagem.textContent = data.erro;
      mensagem.className = "mt-4 text-center font-semibold text-red-600";
      mensagem.classList.remove('hidden');
    } else {
      mensagem.textContent = "Erro ao salvar cliente.";
      mensagem.className = "mt-4 text-center font-semibold text-red-600";
      mensagem.classList.remove('hidden');
    }
  } catch (error) {
    mensagem.textContent = "Erro ao conectar com o servidor.";
    mensagem.className = "mt-4 text-center font-semibold text-red-600";
    mensagem.classList.remove('hidden');
    console.error(error);
  }
});