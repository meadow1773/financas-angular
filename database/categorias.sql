CREATE TABLE IF NOT EXISTS categorias(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  fk_tipo_id INTEGER NOT NULL REFERENCES tipos(id),
  data_cadastro TIMESTAMP without time zone DEFAULT now(),
  data_alteracao TIMESTAMP without time zone
);