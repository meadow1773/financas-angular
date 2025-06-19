INSERT INTO public.icones (id, link, mat_icon) VALUES
    (2, 'trending_up', true),
    (3, 'trending_down', true),
    (4, 'savings', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.tipos (id, nome, fk_icone_id) VALUES
    (1, 'Receitas', 2), 
    (2, 'Despesas Fixas', 3), 
    (3, 'Demais Despesas', 3), 
    (4, 'Investimentos', 3) 
ON CONFLICT DO NOTHING;


INSERT INTO public.categorias (id, nome, fk_tipo_id, fk_icone_id) VALUES 
    (1, 'Salário', 1, 1),
    (2, 'Outras entradas', 1, 1), 
    (3, 'Residência', 2, 1), 
    (4, 'Mercado', 2, 1), 
    (5, 'Saúde', 2, 1), 
    (6, 'Transporte', 2, 1), 
    (7, 'Serviços', 2, 1), 
    (8, 'Celular', 2, 1), 
    (9, 'Streaming', 2, 1), 
    (10, 'Débito', 3, 1), 
    (11, 'Cartão BB', 3, 1), 
    (12, 'Cartão Inter', 3, 1), 
    (13, 'Investimentos', 4, 4) 
ON CONFLICT DO NOTHING;