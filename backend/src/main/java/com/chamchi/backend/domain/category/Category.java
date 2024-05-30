package com.chamchi.backend.domain.category;

import com.chamchi.backend.dto.category.CategoryRequest;
import com.chamchi.backend.dto.category.CategoryResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_id_seq")
    @SequenceGenerator(name = "category_id_seq", sequenceName = "category_id_seq", allocationSize = 1)
    private Integer id;

    private String name;

    private Integer turn;

    private String isDeleted;


    public Category(Integer id) {
        this.id = id;
    }

    public Category(CategoryRequest request) {
        this.id = request.getId();
        this.name = request.getName();
        this.turn = request.getTurn();
        this.isDeleted = request.getIsDeleted();
    }

    public Category delete(Integer categoryId) {
        this.id = categoryId;
        this.isDeleted = "Y";
        return this;
    }
}
