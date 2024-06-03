package com.chamchi.backend.controller.category;

import com.chamchi.backend.dto.category.CategoryRequest;
import com.chamchi.backend.dto.category.CategoryResponse;
import com.chamchi.backend.service.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/api/category")
    public List<CategoryResponse> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping("/api/category")
    public void insertOrUpdate(@RequestBody List<CategoryRequest> requestList) {
        categoryService.insertOrUpdate(requestList);
    }
}
