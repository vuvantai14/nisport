package com.lunafashion.order;

import com.lunafashion.common.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

  Optional<Order> findByIdAndUserId(Long id, Long userId);

  long countByStatus(OrderStatus status);

  List<Order> findByStatusAndCreatedAtBetween(OrderStatus status, Instant from, Instant to);

  @Query("select coalesce(sum(o.total), 0) from Order o where o.status = :status")
  BigDecimal sumTotalByStatus(@Param("status") OrderStatus status);

  @Query("""
      select coalesce(sum(o.total), 0)
      from Order o
      where o.status = :status
        and o.createdAt >= :from
        and o.createdAt < :to
      """)
  BigDecimal sumTotalByStatusAndCreatedAtRange(
      @Param("status") OrderStatus status,
      @Param("from") Instant from,
      @Param("to") Instant to
  );
}
