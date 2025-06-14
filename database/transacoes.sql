CREATE TABLE IF NOT EXISTS transacoes (
  id SERIAL PRIMARY KEY,
  fk_categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  mes INTEGER NOT NULL,
  ano INTEGER NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_cadastro TIMESTAMP without time zone DEFAULT now(),
  data_alteracao TIMESTAMP without time zone
);