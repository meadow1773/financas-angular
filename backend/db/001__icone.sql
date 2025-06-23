CREATE TABLE IF NOT EXISTS icones (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    mat_icon BOOLEAN,
    data_cadastro TIMESTAMP without time zone DEFAULT now(),
    data_alteracao TIMESTAMP without time zone
);


INSERT INTO public.icones (id, link, mat_icon) VALUES
    (1, 'attach_money', true),
    (2, 'trending_up', true),
    (3, 'trending_down', true),
    (4, 'account_balance', true),
    (5, 'savings', true),
    (6, 'money_bag', true),
    (7, 'home', true),
    (8, 'shopping_cart', true),
    (9, 'local_hospital', true),
    (10, 'directions_car', true),
    (11, 'home_repair_service', true),
    (12, 'mobile', true),
    (13, 'subscriptions', true),
    (14, 'credit_card', true)
ON CONFLICT DO NOTHING;