CREATE TABLE IF NOT EXISTS tipos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(15) NOT NULL,
  data_cadastro TIMESTAMP without time zone DEFAULT now(),
  data_alteracao TIMESTAMP without time zone
);