ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS chk_products_tag;

ALTER TABLE public.products
  ADD CONSTRAINT chk_products_tag
  CHECK (
    tag IS NULL
    OR tag IN ('SALE', 'HOT', 'NEW', 'BASIC')
  );
