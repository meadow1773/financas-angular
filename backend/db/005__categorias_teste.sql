INSERT INTO public.icones (id, link, mat_icon) VALUES
    (2, 'trending_up', true),
    (3, 'trending_down', true),
    (4, 'savings', true),
    (5, 'money_bag', true),
    (6, 'home', true),
    (7, 'shopping_cart', true),
    (8, 'local_hospital', true),
    (9, 'directions_car', true),
    (10, 'home_repair_service', true),
    (11, 'mobile', true),
    (12, 'subscriptions', true),
    (13, 'credit_card', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.tipos (id, nome, fk_icone_id) VALUES
    (1, 'Receitas', 2), 
    (2, 'Despesas Fixas', 3), 
    (3, 'Demais Despesas', 3), 
    (4, 'Investimentos', 3) 
ON CONFLICT DO NOTHING;


INSERT INTO public.categorias (id, nome, fk_tipo_id, fk_icone_id) VALUES 
    (1, 'Salário', 1, 5),
    (2, 'Outras entradas', 1, 1), 
    (3, 'Residência', 2, 6), 
    (4, 'Mercado', 2, 7), 
    (5, 'Saúde', 2, 8), 
    (6, 'Transporte', 2, 9), 
    (7, 'Serviços', 2, 10), 
    (8, 'Celular', 2, 11), 
    (9, 'Streaming', 2, 12), 
    (10, 'Débito', 3, 1), 
    (11, 'Cartão BB', 3, 13), 
    (12, 'Cartão Inter', 3, 13), 
    (13, 'Investimentos', 4, 4) 
ON CONFLICT DO NOTHING;