# Sistema_Palestras
O Sistema de Palestras é uma aplicação web full-stack desenvolvida para gerenciar eventos acadêmicos.
Permitindo que os usuários se cadastrem, visualizem palestras e realizem inscrições. O sistema conta com um painel administrativo para gerenciamento de eventos e usuários.

# Tecnologias Utilizadas:
Camada	          Tecnologia        	Versão
Frontend	        Angular     	      18+
Backend	          Node.js + Express 	20+
Banco de Dados	  MySQL	             8.0+
Estilização	Bootstrap              5	5.x
Segurança	       bcrypt	              5.x

# Funcionalidades Implementadas
# Cadastro de Usuários (Frontend + Backend + Banco)
Descrição: Usuários podem criar uma conta no sistema.
Fluxo:
1.	Usuário preenche formulário com email, nome e senha
2.	Frontend valida campos obrigatórios
3.	Backend verifica se email já existe
4.	Senha é criptografada com bcrypt
5.	Dados são salvos no banco

# Endpoints da API
Método	Endpoint	Descrição	Autenticação
POST	/api/cadastro	Cadastrar usuário	Público
POST	/api/login	Autenticar usuário	Público
POST	/api/admin	Cadastrar evento	Admin
GET	/api/palestras	Listar eventos	Público
POST	/api/inscricao	Inscrever em evento	Usuário comum
