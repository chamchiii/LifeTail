package com.chamchi.backend.domain.category;

import com.chamchi.backend.dto.category.CategoryResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {
    @Id
    private Long id;
    private String name;

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category(Long id){
        this.id = id;
    }

//    public Category(CategoryResponse response){
//        this.id = response.getId();
//        this.name = response.getName();
//    }
//
//    public Category(CategoryRequest request) {
//        this.id = request.getId();
//        this.name = request.getName();
//    }
}
