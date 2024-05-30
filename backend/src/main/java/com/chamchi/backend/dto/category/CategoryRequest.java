package com.chamchi.backend.dto.category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryRequest {
    private Integer id;
    private String name;
    private Integer turn;
    private String isDeleted;

    public void setId(String id){
        if(id == null || id.trim().isEmpty()){
            this.id = null;
        }else {
            this.id = Integer.valueOf(id);
        }
    }

    @Override
    public String toString() {
        return "CategoryRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", turn=" + turn +
                ", isDeleted='" + isDeleted + '\'' +
                '}';
    }
}
