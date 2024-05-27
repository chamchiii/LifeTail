package com.chamchi.backend.repository.category;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.dto.category.CategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query(value = "SELECT c.id , c.name , c.turn, COALESCE(n.count, 0) AS count FROM Category c " +
            "LEFT OUTER JOIN (SELECT p.category AS category_id, count(p.category) AS count FROM post p WHERE p.is_deleted = 'N' GROUP BY p.category) AS n " +
            "ON c.id = n.category_id ORDER BY c.turn", nativeQuery = true)
    Optional<List<Object[]>> findAllCategoryWithCount();

    Optional<Category> findTopByOrderByTurnAsc();
}
