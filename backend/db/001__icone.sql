CREATE TABLE IF NOT EXISTS icones (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    mat_icon BOOLEAN,
    data_cadastro TIMESTAMP without time zone DEFAULT now(),
    data_alteracao TIMESTAMP without time zone
);


INSERT INTO public.icones (id, link, mat_icon) VALUES
    (1, 'attach_money', true)
ON CONFLICT DO NOTHING;