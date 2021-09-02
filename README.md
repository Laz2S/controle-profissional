# controle-profissional
Projeto com intuito de estudo

Backend - Node.js

Frontend - React.js

Banco - Postgresql

Banco: Para o teste foi criado duas entidades, uma chamada professional_type (id, descricao, situacao, updatedAt, createdAt), e outra chamada professional (id, nome, telefone, email, situacao,  updatedAt,  createdAt, tipoDeProfissional), como também uma entidade de usuário para manter acesso ao sistema.

Backend: Foi utilizado de softdelete na implementação do crud, fazendo validação de [FK] para não ser possível deletar um registro que já esteja sendo usado por outro. Fora também implementado paginação nas rotas de Get All. Tambem implementado Oauth2 para gerenciamento de permissões tanto de acesso como de ações.

Frontend: Foi desenvolvido duas telas para o gerenciamento das entidades professional_type e professional, ambas com listagem paginada e um modal de formulário para adição e edição de registros. Através da listagem é possível deletar um registro.
