ALTER TABLE order_items
    ADD COLUMN IF NOT EXISTS product_slug character varying(220),
    ADD COLUMN IF NOT EXISTS sku character varying(80);
