package com.chamchi.backend.domain.category;

import com.chamchi.backend.dto.category.CategoryResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private Integer id;
    private String name;
    private Integer turn;

    public Category(Integer id){
        this.id = id;
    }
}
