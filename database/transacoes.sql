CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(10) NOT NULL CHECK(tipo IN ('despesa', 'receita')),
  fk_categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  mes INTEGER NOT NULL,
  ano INTEGER NOT NULL,
  valor DECIMAL(10, 2) NOT NULL
);