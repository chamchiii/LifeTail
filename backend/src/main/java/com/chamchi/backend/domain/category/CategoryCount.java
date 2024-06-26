package com.chamchi.backend.domain.category;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
public class CategoryCount {
    @Id
    private Integer id;
    private String name;
    private Integer count;

    public CategoryCount(Integer id, String name, Integer count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }
}
