CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  fk_categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  mes INTEGER NOT NULL,
  ano INTEGER NOT NULL,
  valor DECIMAL(10, 2) NOT NULL
);