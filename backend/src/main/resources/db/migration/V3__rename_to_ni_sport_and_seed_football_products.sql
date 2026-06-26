TRUNCATE TABLE public.product_images, public.product_variants, public.products, public.categories
  RESTART IDENTITY CASCADE;

INSERT INTO public.categories (id, name, slug, description, active, created_at, updated_at) VALUES
  (1, 'Áo bóng đá', 'ao-bong-da', 'Áo bóng đá đội tuyển và câu lạc bộ tại Ni Sport', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Quần bóng đá', 'quan-bong-da', 'Quần bóng đá nam, nữ và unisex tại Ni Sport', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'Bộ đồ bóng đá', 'bo-do-bong-da', 'Bộ đồ bóng đá đồng bộ áo và quần tại Ni Sport', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (4, 'Đồ tập bóng đá', 'do-tap-bong-da', 'Trang phục tập luyện bóng đá tại Ni Sport', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (5, 'Phụ kiện', 'phu-kien', 'Phụ kiện bóng đá và tập luyện tại Ni Sport', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

WITH product_seed (id, name, slug, category_id, gender, price, old_price, description, tag) AS (
  VALUES
    (1, 'Áo bóng đá Argentina sân nhà', 'ao-bong-da-argentina-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Argentina sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (2, 'Áo bóng đá Brazil sân nhà', 'ao-bong-da-brazil-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Brazil sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (3, 'Áo bóng đá Pháp sân nhà', 'ao-bong-da-phap-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Pháp sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (4, 'Áo bóng đá Đức sân nhà', 'ao-bong-da-duc-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Đức sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (5, 'Áo bóng đá Tây Ban Nha sân nhà', 'ao-bong-da-tay-ban-nha-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Tây Ban Nha sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'SALE'),
    (6, 'Áo bóng đá Bồ Đào Nha sân nhà', 'ao-bong-da-bo-dao-nha-san-nha', 1, 'UNISEX', 309000.00, 369000.00, 'Áo bóng đá Bồ Đào Nha sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (7, 'Áo bóng đá Anh sân nhà', 'ao-bong-da-anh-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Anh sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (8, 'Áo bóng đá Nhật Bản sân nhà', 'ao-bong-da-nhat-ban-san-nha', 1, 'UNISEX', 299000.00, 359000.00, 'Áo bóng đá Nhật Bản sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'BASIC'),
    (9, 'Áo bóng đá Việt Nam sân nhà', 'ao-bong-da-viet-nam-san-nha', 1, 'UNISEX', 289000.00, 349000.00, 'Áo bóng đá Việt Nam sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (10, 'Áo bóng đá Hàn Quốc sân nhà', 'ao-bong-da-han-quoc-san-nha', 1, 'UNISEX', 289000.00, 349000.00, 'Áo bóng đá Hàn Quốc sân nhà chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (11, 'Áo bóng đá Manchester United', 'ao-bong-da-manchester-united', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá Manchester United chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (12, 'Áo bóng đá Manchester City', 'ao-bong-da-manchester-city', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá Manchester City chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (13, 'Áo bóng đá Liverpool', 'ao-bong-da-liverpool', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá Liverpool chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (14, 'Áo bóng đá Arsenal', 'ao-bong-da-arsenal', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá Arsenal chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (15, 'Áo bóng đá Chelsea', 'ao-bong-da-chelsea', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá Chelsea chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'BASIC'),
    (16, 'Áo bóng đá Real Madrid', 'ao-bong-da-real-madrid', 1, 'UNISEX', 329000.00, 399000.00, 'Áo bóng đá Real Madrid chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (17, 'Áo bóng đá Barcelona', 'ao-bong-da-barcelona', 1, 'UNISEX', 329000.00, 399000.00, 'Áo bóng đá Barcelona chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (18, 'Áo bóng đá Bayern Munich', 'ao-bong-da-bayern-munich', 1, 'UNISEX', 329000.00, 399000.00, 'Áo bóng đá Bayern Munich chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'NEW'),
    (19, 'Áo bóng đá Inter Miami', 'ao-bong-da-inter-miami', 1, 'UNISEX', 339000.00, 409000.00, 'Áo bóng đá Inter Miami chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'HOT'),
    (20, 'Áo bóng đá AC Milan', 'ao-bong-da-ac-milan', 1, 'UNISEX', 319000.00, 389000.00, 'Áo bóng đá AC Milan chất vải thể thao thoáng mát, phù hợp đá bóng và cổ vũ.', 'SALE'),
    (21, 'Quần bóng đá nam basic đen', 'quan-bong-da-nam-basic-den', 2, 'MALE', 159000.00, 199000.00, 'Quần bóng đá nam basic chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'BASIC'),
    (22, 'Quần bóng đá nam basic trắng', 'quan-bong-da-nam-basic-trang', 2, 'MALE', 159000.00, 199000.00, 'Quần bóng đá nam basic chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'BASIC'),
    (23, 'Quần bóng đá nam xanh navy', 'quan-bong-da-nam-xanh-navy', 2, 'MALE', 169000.00, 209000.00, 'Quần bóng đá nam xanh navy chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'NEW'),
    (24, 'Quần bóng đá nam đỏ đô', 'quan-bong-da-nam-do-do', 2, 'MALE', 169000.00, 209000.00, 'Quần bóng đá nam đỏ đô chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'SALE'),
    (25, 'Quần bóng đá nam xám thể thao', 'quan-bong-da-nam-xam-the-thao', 2, 'MALE', 169000.00, 209000.00, 'Quần bóng đá nam xám thể thao chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'NEW'),
    (26, 'Quần bóng đá nữ basic đen', 'quan-bong-da-nu-basic-den', 2, 'FEMALE', 159000.00, 199000.00, 'Quần bóng đá nữ basic chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'BASIC'),
    (27, 'Quần bóng đá nữ basic trắng', 'quan-bong-da-nu-basic-trang', 2, 'FEMALE', 159000.00, 199000.00, 'Quần bóng đá nữ basic chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'BASIC'),
    (28, 'Quần bóng đá nữ xanh pastel', 'quan-bong-da-nu-xanh-pastel', 2, 'FEMALE', 169000.00, 209000.00, 'Quần bóng đá nữ xanh pastel chất liệu co giãn, nhanh khô và dễ phối với áo đấu.', 'NEW'),
    (29, 'Quần bóng đá unisex co giãn', 'quan-bong-da-unisex-co-gian', 2, 'UNISEX', 179000.00, 219000.00, 'Quần bóng đá unisex co giãn chất liệu nhanh khô, phù hợp tập luyện và thi đấu.', 'HOT'),
    (30, 'Quần bóng đá unisex quick dry', 'quan-bong-da-unisex-quick-dry', 2, 'UNISEX', 189000.00, 229000.00, 'Quần bóng đá unisex quick dry nhẹ, thoáng và phù hợp vận động cường độ cao.', 'HOT'),
    (31, 'Bộ đồ bóng đá Argentina', 'bo-do-bong-da-argentina', 3, 'UNISEX', 429000.00, 499000.00, 'Bộ đồ bóng đá gồm áo và quần đồng bộ, chất vải thể thao thoáng mát.', 'HOT'),
    (32, 'Bộ đồ bóng đá Brazil', 'bo-do-bong-da-brazil', 3, 'UNISEX', 429000.00, 499000.00, 'Bộ đồ bóng đá gồm áo và quần đồng bộ, chất vải thể thao thoáng mát.', 'HOT'),
    (33, 'Bộ đồ bóng đá Pháp', 'bo-do-bong-da-phap', 3, 'UNISEX', 429000.00, 499000.00, 'Bộ đồ bóng đá gồm áo và quần đồng bộ, chất vải thể thao thoáng mát.', 'NEW'),
    (34, 'Bộ đồ bóng đá Đức', 'bo-do-bong-da-duc', 3, 'UNISEX', 429000.00, 499000.00, 'Bộ đồ bóng đá gồm áo và quần đồng bộ, chất vải thể thao thoáng mát.', 'NEW'),
    (35, 'Bộ đồ bóng đá Việt Nam', 'bo-do-bong-da-viet-nam', 3, 'UNISEX', 409000.00, 479000.00, 'Bộ đồ bóng đá gồm áo và quần đồng bộ, chất vải thể thao thoáng mát.', 'HOT'),
    (36, 'Bộ đồ tập bóng đá basic đen', 'bo-do-tap-bong-da-basic-den', 4, 'UNISEX', 359000.00, 429000.00, 'Bộ đồ tập bóng đá basic phù hợp tập luyện hằng ngày và sinh hoạt thể thao.', 'BASIC'),
    (37, 'Bộ đồ tập bóng đá basic trắng', 'bo-do-tap-bong-da-basic-trang', 4, 'UNISEX', 359000.00, 429000.00, 'Bộ đồ tập bóng đá basic phù hợp tập luyện hằng ngày và sinh hoạt thể thao.', 'BASIC'),
    (38, 'Bộ đồ tập bóng đá xanh navy', 'bo-do-tap-bong-da-xanh-navy', 4, 'UNISEX', 379000.00, 449000.00, 'Bộ đồ tập bóng đá xanh navy phù hợp tập luyện hằng ngày và sinh hoạt thể thao.', 'NEW'),
    (39, 'Áo khoác thể thao bóng đá', 'ao-khoac-the-thao-bong-da', 4, 'UNISEX', 459000.00, 539000.00, 'Áo khoác thể thao bóng đá nhẹ, dễ mặc trước và sau buổi tập.', 'HOT'),
    (40, 'Áo bib tập luyện bóng đá', 'ao-bib-tap-luyen-bong-da', 4, 'UNISEX', 89000.00, 119000.00, 'Áo bib tập luyện bóng đá màu nổi, phù hợp chia đội khi tập luyện.', 'SALE'),
    (41, 'Bóng đá size 5 tiêu chuẩn', 'bong-da-size-5-tieu-chuan', 5, 'UNISEX', 249000.00, 299000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'HOT'),
    (42, 'Tất bóng đá cổ cao', 'tat-bong-da-co-cao', 5, 'UNISEX', 79000.00, 99000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'BASIC'),
    (43, 'Găng tay thủ môn', 'gang-tay-thu-mon', 5, 'UNISEX', 199000.00, 249000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'NEW'),
    (44, 'Bọc ống đồng bóng đá', 'boc-ong-dong-bong-da', 5, 'UNISEX', 99000.00, 129000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'BASIC'),
    (45, 'Túi đựng giày bóng đá', 'tui-dung-giay-bong-da', 5, 'UNISEX', 149000.00, 189000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'NEW'),
    (46, 'Bình nước thể thao', 'binh-nuoc-the-thao', 5, 'UNISEX', 119000.00, 149000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'BASIC'),
    (47, 'Băng đội trưởng', 'bang-doi-truong', 5, 'UNISEX', 59000.00, 79000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'SALE'),
    (48, 'Bộ cones tập luyện', 'bo-cones-tap-luyen', 5, 'UNISEX', 139000.00, 179000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'NEW'),
    (49, 'Bơm bóng mini', 'bom-bong-mini', 5, 'UNISEX', 89000.00, 119000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'BASIC'),
    (50, 'Túi thể thao bóng đá', 'tui-the-thao-bong-da', 5, 'UNISEX', 259000.00, 319000.00, 'Phụ kiện bóng đá cần thiết cho tập luyện, thi đấu và sử dụng hằng ngày.', 'HOT')
)
INSERT INTO public.products (id, name, slug, category_id, gender, price, old_price, description, tag, status, created_at, updated_at)
SELECT id, name, slug, category_id, gender, price, old_price, description, tag, 'SELLING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM product_seed;

INSERT INTO public.product_images (product_id, image_url, is_thumbnail, sort_order, created_at)
SELECT id, '/assets/products/product-' || id || '.jpg', true, 1, CURRENT_TIMESTAMP
FROM public.products
WHERE id BETWEEN 1 AND 50
ORDER BY id;

WITH sizes (size_name, size_index) AS (
  VALUES
    ('S', 1),
    ('M', 2),
    ('L', 3),
    ('XL', 4),
    ('FREE_SIZE', 5)
),
colors (color_name, color_code, color_index) AS (
  VALUES
    ('Black', 'BLA', 1),
    ('White', 'WHI', 2),
    ('Red', 'RED', 3),
    ('Blue', 'BLU', 4),
    ('Navy', 'NAV', 5),
    ('Yellow', 'YEL', 6)
)
INSERT INTO public.product_variants (product_id, size, color, stock, sku, price, created_at, updated_at)
SELECT
  p.id,
  s.size_name,
  c.color_name,
  10 + (((p.id * 7) + (s.size_index * 5) + (c.color_index * 3)) % 41),
  'NS-' || LPAD(p.id::text, 3, '0') || '-' || REPLACE(s.size_name, '_', '') || '-' || c.color_code,
  p.price,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM public.products p
JOIN sizes s ON (
  (p.category_id = 5 AND s.size_name = 'FREE_SIZE')
  OR (p.category_id <> 5 AND s.size_name <> 'FREE_SIZE')
)
CROSS JOIN colors c
WHERE p.id BETWEEN 1 AND 50
ORDER BY p.id, s.size_index, c.color_index;

SELECT setval(pg_get_serial_sequence('categories', 'id'), COALESCE((SELECT MAX(id) FROM public.categories), 1));
SELECT setval(pg_get_serial_sequence('products', 'id'), COALESCE((SELECT MAX(id) FROM public.products), 1));
SELECT setval(pg_get_serial_sequence('product_images', 'id'), COALESCE((SELECT MAX(id) FROM public.product_images), 1));
SELECT setval(pg_get_serial_sequence('product_variants', 'id'), COALESCE((SELECT MAX(id) FROM public.product_variants), 1));
