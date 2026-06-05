const bcrypt = require('bcrypt');

async function gerarHash() {
  const senha = '12345678'; // ← Usar a senha ORIGINAL do usuário
  const hash = await bcrypt.hash(senha, 10);
  console.log(`Senha: ${senha}`);
  console.log(`Hash: ${hash}`);
}

gerarHash();
