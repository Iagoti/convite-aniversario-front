# convite-aniversario

Projeto Angular para o convite online do aniversário da Isabella.

## Rodar o projeto

Inicie primeiro o PostgreSQL e a API conforme o README de `convite-aniversario-back`.

```bash
npm install
npm start
```

Acesse:

- Site público: `http://localhost:4200`
- Administração: `http://localhost:4200/admin`

Login administrativo de teste:

- E-mail: `admin@isabella.com`
- Senha: `123456`

## O que já está pronto

- One page pública com vídeo inicial.
- Exibição das informações do convite após o vídeo.
- Modal para confirmar presença com nome, telefone e quantidade de pessoas.
- Persistência no PostgreSQL por meio da API Java.
- Painel administrativo.
- Dashboard com total de confirmações e pessoas confirmadas.
- Tela para listar, buscar, cancelar, excluir e exportar confirmações em CSV.
- Tela para editar dados do evento.
- Autenticação administrativa com JWT.
- `GET /api/eventos/atual`
- `PUT /api/eventos/atual`
- `POST /api/confirmacoes`
- `GET /api/confirmacoes`
- `PATCH /api/confirmacoes/{id}/cancelamento`
- `DELETE /api/confirmacoes/{id}`

A URL da API está em `src/environments/environment.ts`:

- Produção: `https://convite-aniversario-back.onrender.com/api`
