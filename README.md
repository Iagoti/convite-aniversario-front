# convite-aniversario

Projeto Angular para o convite online do aniversário da Isabella.

## Rodar o projeto

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
- Armazenamento temporário em `localStorage`.
- Painel administrativo.
- Dashboard com total de confirmações e pessoas confirmadas.
- Tela para listar, buscar, cancelar, excluir e exportar confirmações em CSV.
- Tela para editar dados do evento.
- Script SQL em `database/schema.sql` para futura integração com backend.

## Próximo passo

Substituir o `localStorage` por uma API Spring Boot usando os endpoints:

- `GET /api/evento`
- `PUT /api/evento/{id}`
- `POST /api/confirmacoes`
- `GET /api/confirmacoes`
- `DELETE /api/confirmacoes/{id}`
