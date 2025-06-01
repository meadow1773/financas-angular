INSERT INTO public.tipos (id, nome) VALUES
(1, 'Receitas'), (2, 'Despesas Fixas'), (3, 'Demais Despesas'), (4, 'Investimentos');

INSERT INTO public.categorias (id, nome, fk_tipo_id) VALUES 
(1, 'Salário', 1),(2, 'Outras entradas', 1), (3, 'Residência', 2), (4, 'Mercado', 2), (5, 'Saúde', 2), (6, 'Transporte', 2), (7, 'Serviços', 2), (8, 'Celular', 2), (9, 'Streaming', 2), (10, 'Débito', 3), (11, 'Cartão BB', 3), (12, 'Cartão Inter', 3), (13, 'Investimentos', 4);