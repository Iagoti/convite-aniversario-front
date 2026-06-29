CREATE TABLE evento (
    id SERIAL PRIMARY KEY,
    nome_aniversariante VARCHAR(100) NOT NULL,
    idade VARCHAR(50),
    data_evento DATE NOT NULL,
    horario TIME NOT NULL,
    mensagem TEXT,
    local_festa VARCHAR(255),
    endereco TEXT,
    link_maps TEXT,
    video_url TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE confirmacao_presenca (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL REFERENCES evento(id),
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    quantidade_pessoas INTEGER DEFAULT 1,
    status VARCHAR(30) DEFAULT 'CONFIRMADO',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sugestao_presente (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL REFERENCES evento(id),
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    icone VARCHAR(50)
);

CREATE TABLE admin_usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
