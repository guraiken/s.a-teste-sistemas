CREATE DATABASE sa_carros;

\c sa_carros;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(80) NOT NULL,
    cargo VARCHAR(10) CHECK (cargo IN ('VENDAS', 'ADMIN'))
);

CREATE TABLE token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    type VARCHAR(10) DEFAULT 'ACCESS' CHECK (type IN ('ACCESS', 'REFRESH')),
    revoked BOOLEAN DEFAULT FALSE,
    expiresAt TIMESTAMP NOT NULL,
    usuarioId INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    cor VARCHAR(100) NOT NULL,
    valor DECIMAL(9,2) NOT NULL,
    ano INTEGER
);

INSERT INTO carros (modelo, cor, valor, ano)
VALUES
('Fiat Uno', 'Vermelho', 15000, 2019),
('Nissan Versa', 'Vermelho', 35000, 2020),
-- Populares e Hatches
('Chevrolet Onix', 'Branco', 55000, 2021),
('Hyundai HB20', 'Prata', 58000, 2022),
('Volkswagen Gol', 'Preto', 42000, 2020),
('Renault Sandero', 'Cinza', 38000, 2019),
('Ford Ka', 'Vermelho', 40000, 2020),

-- Sedans
('Toyota Corolla', 'Prata', 110000, 2022),
('Honda Civic', 'Preto', 115000, 2021),
('Chevrolet Onix Plus', 'Azul', 68000, 2023),
('Volkswagen Virtus', 'Branco', 75000, 2022),

-- SUVs e Utilitários
('Jeep Renegade', 'Verde', 95000, 2021),
('Hyundai Creta', 'Branco', 105000, 2022),
('Volkswagen T-Cross', 'Cinza', 102000, 2023),
('Nissan Kicks', 'Preto', 88000, 2021),

-- Modelos Recentes / Premium
('Fiat Fastback', 'Cinza', 125000, 2024),
('BYD Dolphin', 'Delfim Grey', 150000, 2024),
('GWM Ora 03', 'Branco', 160000, 2024);