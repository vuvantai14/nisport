package com.lunafashion.order;

import com.lunafashion.common.enums.OrderStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

  @Query("""
      select item.product.id,
             item.productName,
             item.productSlug,
             item.imageUrl,
             coalesce(sum(item.quantity), 0),
             coalesce(sum(item.lineTotal), 0)
      from OrderItem item
      where item.order.status = :status
      group by item.product.id, item.productName, item.productSlug, item.imageUrl
      order by coalesce(sum(item.quantity), 0) desc
      """)
  List<Object[]> findTopProductsByOrderStatus(@Param("status") OrderStatus status, Pageable pageable);
}
