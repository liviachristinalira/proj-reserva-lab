-- init.sql
-- Executado automaticamente na primeira vez que o container do Postgres sobe.

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS laboratorios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    bloco VARCHAR(150),
    capacidade INTEGER NOT NULL DEFAULT 1,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    laboratorio_id INTEGER NOT NULL REFERENCES laboratorios(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmada', -- confirmada | cancelada
    descricao TEXT,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT data_valida CHECK (data_fim > data_inicio)
);

-- Índice para consultar rapidamente conflitos de horário por laboratório
CREATE INDEX IF NOT EXISTS idx_reservas_laboratorio_periodo
    ON reservas (laboratorio_id, data_inicio, data_fim);
