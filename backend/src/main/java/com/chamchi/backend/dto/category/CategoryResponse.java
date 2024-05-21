package com.chamchi.backend.dto.category;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.domain.category.CategoryCount;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private Long count;

    public CategoryResponse(Long id, String name, Long count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }

    public CategoryResponse(Category category){
        this.id = category.getId();
        this.name = category.getName();
    }

    public CategoryResponse(CategoryCount categoryCount){
        this.id = categoryCount.getId();
        this.name = categoryCount.getName();
        this.count = categoryCount.getCount();
    }
}
