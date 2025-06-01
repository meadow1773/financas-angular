CREATE TABLE tipos(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(15) NOT NULL CHECK(nome IN ('receita', 'despesa-fixa', 'despesa', 'investimento'))
);