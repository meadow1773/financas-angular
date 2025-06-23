CREATE TABLE IF NOT EXISTS tipos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(15) NOT NULL,
    fk_icone_id INTEGER NOT NULL REFERENCES icones(id),
    data_cadastro TIMESTAMP without time zone DEFAULT now(),
    data_alteracao TIMESTAMP without time zone
);


INSERT INTO public.tipos (id, nome, fk_icone_id) VALUES
    (1, 'Receitas', 2), 
    (2, 'Despesas Fixas', 3), 
    (3, 'Demais Despesas', 3), 
    (4, 'Investimentos', 3) 
ON CONFLICT DO NOTHING;