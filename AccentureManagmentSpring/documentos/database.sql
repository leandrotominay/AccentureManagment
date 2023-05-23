-- Criação da tabela Fornecedor
CREATE TABLE Fornecedor (
    ID BIGSERIAL NOT NULL PRIMARY KEY,
    NOMEFORNECEDOR VARCHAR(150) NOT NULL,
    CNPJ VARCHAR(30) UNIQUE,
    CPF VARCHAR(14) UNIQUE,
    RG VARCHAR(14) UNIQUE,
    DATA_NASCIMENTO VARCHAR(25),
    EMAIL VARCHAR(150)
);


-- Criação da tabela Empresa
CREATE TABLE Empresa (
    ID BIGSERIAL NOT NULL PRIMARY KEY,
    NOMEFANTASIA VARCHAR(150) NOT NULL,
    CNPJ VARCHAR(30) UNIQUE,
    CEP VARCHAR(10) NOT NULL
);

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    ID BIGSERIAL NOT NULL PRIMARY KEY,
	LOGIN VARCHAR(150) NOT NULL,
	SENHA VARCHAR(150) NOT NULL
);

-- Cadastro de Usuario para Autenticação
INSERT INTO Usuario(login, senha)
VALUES ('admin2', 'admin123');




CREATE TABLE Fornecedor_Empresa (
    fornecedor_id_fk BIGINT,
    empresa_id_fk BIGINT,
    FOREIGN KEY (fornecedor_id_fk) REFERENCES Fornecedor(ID),
    FOREIGN KEY (empresa_id_fk) REFERENCES Empresa(ID),
    PRIMARY KEY (fornecedor_id_fk, empresa_id_fk)
);


-- Adicionando as chaves estrangeiras
ALTER TABLE Fornecedor ADD COLUMN empresa_id_fk BIGINT;
ALTER TABLE Empresa ADD COLUMN fornecedor_id_fk BIGINT;

-- Adicionando as restrições de chave estrangeira
ALTER TABLE Fornecedor ADD CONSTRAINT fk_fornecedor_empresa FOREIGN KEY (empresa_id_fk) REFERENCES Empresa(ID);
ALTER TABLE Empresa ADD CONSTRAINT fk_empresa_fornecedor FOREIGN KEY (fornecedor_id_fk) REFERENCES Fornecedor(ID);