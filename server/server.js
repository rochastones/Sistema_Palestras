const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Adicionado para criar hash nas senhas
const conexao = require('./db');
const bcrypt = require('bcrypt'); // Adicionado para hash de senha
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/cadastro', async (req, res) => {
  const { email, nome, senha, admin } = req.body; // ← Adicionado admin
  try {
    // Verifica se o email já está cadastrado
    const [usuarios] = await conexao.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length > 0) {
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    // Gera hash da senha (segurança)
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Se admin não veio do front, define como 0
    const nivelAdmin = admin === 1 || admin === true ? 1 : 0;

    // Adicionando o campo admin
    await conexao.execute('INSERT INTO usuarios (email, nome, senha, admin) VALUES (?, ?, ?, ?)', [
      email,
      nome,
      senhaHash,
      nivelAdmin,
    ]); // Usando senha com hash

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: `Erro ao cadastrar: ${error.message}` });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [usuarios] = await conexao.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuarios.length === 0) {
      // Uso do status 401 para credenciais inválidas
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const usuario = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      // Uso do status 401 para credenciais inválidas
      return res.status(401).json({ message: 'senha inválida' });
    }

    /* if (usuario.senha !== senha) {
      // Uso do status 401 para credenciais inválidas
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }*/

    const userData = {
      id: usuario.ID,
      email: usuario.email,
      nome: usuario.nome,
      admin: usuario.admin || false, // Garantir que admin existe
    };

    // Uso do status 200 para login com sucesso
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      userData,
      tipoMensagem: 'success',
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login. Tente novamente mais tarde.' });
  }
});

app.post('/api/admin', async (req, res) => {
  const { titulo, descricao, nomePalestrante, localEvento, dataEvento } = req.body;

  // Validação dos campos obrigatórios 
  if (!titulo || !descricao || !nomePalestrante || !localEvento || !dataEvento) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  const dadosEvento = [titulo, descricao, nomePalestrante, localEvento, dataEvento];
  try {
    console.log(dadosEvento);

    await conexao.execute(
      'INSERT INTO palestra (titulo, descricao, nomePalestrante, localEvento, dataEvento) VALUES(?,?,?,?,?)',
      dadosEvento,
    );
    res.status(201).json({ message: 'Evento cadastrado com sucesso!' });
  } catch (error) {
    console.log(`Erro interno: ${error}`);
    res.status(500).json({ message: 'Erro ao cadastrar evento!' });
  }
});

app.get('/api/palestras', async (req, res) => {
  try {
    const [rows] = await conexao.execute('SELECT * FROM palestra');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar palestras:', err);
    res.status(500).json({ message: 'Erro interno' });
  }
});

app.post('/api/inscricao', async (req, res) => {
  const { idUsuario, idPalestra } = req.body;
  try {
    await conexao.execute('INSERT INTO inscricoes (idUsuario, idPalestra) VALUES (?,?)', [
      idUsuario,
      idPalestra,
    ]);
    res.status(201).json({ message: 'Inscrição realizada :)' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Você já se inscreveu nesse evento!' });
    } else {
      res.status(500).json({ message: 'Erro ao realizar a inscrição :(' });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
