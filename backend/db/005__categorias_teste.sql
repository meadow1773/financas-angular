INSERT INTO public.categorias (nome, fk_tipo_id, fk_icone_id) VALUES 
    ('Salário', 1, 6),
    ('Outras entradas', 1, 2), 
    ('Residência', 2, 7), 
    ('Mercado', 2, 8), 
    ('Saúde', 2, 9), 
    ('Transporte', 2, 10), 
    ('Serviços', 2, 11), 
    ('Celular', 2, 12), 
    ('Streaming', 2, 13), 
    ('Débito', 3, 2), 
    ('Cartão BB', 3, 14), 
    ('Cartão Inter', 3, 14), 
    ('Investimentos', 4, 5) 
ON CONFLICT DO NOTHING;