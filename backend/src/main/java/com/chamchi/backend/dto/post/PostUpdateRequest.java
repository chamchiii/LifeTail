package com.chamchi.backend.dto.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostUpdateRequest {
    private Integer userId;

    private Integer id;

    private String title;

    private String subtitle;

    private String content;

    private Integer categoryId;

    public PostUpdateRequest(Integer userId, Integer id, String title, String subtitle, String content, Integer categoryId) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "PostUpdateRequest{" +
                "userId=" + userId +
                ", id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", content='" + content + '\'' +
                ", categoryId=" + categoryId +
                '}';
    }
}
