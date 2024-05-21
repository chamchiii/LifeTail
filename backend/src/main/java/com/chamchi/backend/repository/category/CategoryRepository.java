package com.chamchi.backend.repository.category;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.dto.category.CategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT c.id , c.name ,count(c.id) FROM Category c INNER JOIN Post p ON c.id = p.category.id  WHERE p.isDeleted = 'N' GROUP BY c.id")
    Optional<List<Object[]>> findAllCategoryWithCount();
}
