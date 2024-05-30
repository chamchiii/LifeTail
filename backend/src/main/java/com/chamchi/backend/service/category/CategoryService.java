package com.chamchi.backend.service.category;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.dto.category.CategoryRequest;
import com.chamchi.backend.dto.category.CategoryResponse;
import com.chamchi.backend.repository.category.CategoryCountRepository;
import com.chamchi.backend.repository.category.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryCountRepository categoryCountRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories() {
        List<CategoryResponse> categoryResponseList = categoryRepository.findAllCategoryWithCount()
                .orElse(Collections.emptyList())
                .stream()
                .map(objects ->
                        new CategoryResponse(Integer.parseInt(String.valueOf(objects[0])), String.valueOf(objects[1]), Integer.parseInt(String.valueOf(objects[2])),"N" ,Integer.parseInt(String.valueOf(objects[3]))))
                .toList();
        System.out.println("사이즈" + categoryResponseList.size());
        return categoryResponseList;
    }

    @Transactional
    public void insertOrUpdate(List<CategoryRequest> requestList) {
        List<Category> categoryList = requestList.stream().map(Category::new).toList();
        categoryRepository.saveAll(categoryList);

        List<Category> categories = categoryRepository.findAllByIsDeletedOrderByTurnAsc("N").orElse(Collections.emptyList());
        for(int i = 0 ; i < categories.size() ; i++){
            categories.get(i).setTurn(i);
        }
        categoryRepository.saveAll(categories);

    }

    @Transactional
    public void deleteCategory(String categoryId){
        Category category = new Category().delete(Integer.parseInt(categoryId));
        categoryRepository.save(category);
    }
}
