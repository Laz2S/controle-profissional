# controle-profissional
Projeto com intuito de estudo

Backend - Node.js

Frontend - React.js (Typescript)

Banco - Postgresql

Banco: Para o teste foi criado duas entidades, uma chamada professional_type (id, descricao, situacao, updatedAt, createdAt), e outra chamada professional (id, nome, telefone, email, situacao,  updatedAt,  createdAt, tipoDeProfissional).

Backend: Fazendo validação de [FK] para não ser possível deletar um registro que já esteja sendo usado por outro. Fora também implementado paginação nas rotas de Get All.

Frontend: Foi desenvolvido uma tela principal com a listagem de professional, onde se pode editar, visualizar ou deletar um registro direto pela tabela. Com dois botões na parte superior para poder criar um professional ou professional_type.


Como inicializar o banco
É importante que tenha instalado o postgresql em sua maquina, após a instalação inicie o software pgAdmin.a
Após a iniciação, crie seu banco de dados, rode os scripts contidos no arquivo chamado script.txt, e crie um arquivo .env com o redirecionamento para seu banco. Caso haja dúvidas, siga o exemplo no exemplo.env.a


Como inicializar o Backend
Acesse a pasta api e, dentro do terminal, digite npm install e depois npm start
Apos iniciar o backend, caso queira acessar seu link, sua url é: http://localhost:4000/



Como inicializar o Frontend
Acesse a pasta spa e, dentro do terminal, digite npm install e depois npm start
Apos iniciar o frontend, acesse através de sua url: http://localhost:3000/
