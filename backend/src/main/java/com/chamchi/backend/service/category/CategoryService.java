package com.chamchi.backend.service.category;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.dto.category.CategoryRequest;
import com.chamchi.backend.dto.category.CategoryResponse;
import com.chamchi.backend.repository.category.CategoryCountRepository;
import com.chamchi.backend.repository.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryCountRepository categoryCountRepository;

    public List<CategoryResponse> getCategories() {
        List<CategoryResponse> categoryResponseList = categoryRepository.findAllCategoryWithCount()
                .orElse(Collections.emptyList())
                .stream()
                .map(objects ->
                        new CategoryResponse(Integer.parseInt(String.valueOf(objects[0])), String.valueOf(objects[1]), Integer.parseInt(String.valueOf(objects[2])), Integer.parseInt(String.valueOf(objects[3]))))
                .toList();
        System.out.println("사이즈" + categoryResponseList.size());
        return categoryResponseList;
    }
}
