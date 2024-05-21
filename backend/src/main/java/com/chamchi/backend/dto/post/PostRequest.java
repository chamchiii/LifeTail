package com.chamchi.backend.dto.post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostRequest {

    //유저번호(sequence)
    private Long userId;

    private String title;

    private String subtitle;

    private String content;

    private Long categoryId;


    public PostRequest(Long userId, String title,String subtitle, String content, Long categoryId) {
        this.userId = userId;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "PostRequest{" +
                "userId=" + userId +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", categoryId='" + categoryId + '\'' +
                '}';
    }
}
