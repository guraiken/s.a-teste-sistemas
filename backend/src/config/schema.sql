CREATE DATABASE sa_carros;

\c sa_carros;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(80) NOT NULL,
    cargo VARCHAR(10) CHECK (cargo IN ('VENDAS', 'ADMIN'))
);

CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(100) NOT NULL,
    valor DECIMAL(9,2) NOT NULL,
    ano INTEGER
);