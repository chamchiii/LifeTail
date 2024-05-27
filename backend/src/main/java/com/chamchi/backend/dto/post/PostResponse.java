package com.chamchi.backend.dto.post;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.domain.post.Post;
import com.chamchi.backend.domain.users.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class PostResponse {

    //글 번호(sequence)
    private Integer id;

    private String title;

    private String subtitle;

    private String content;

    private Date createdDate;

    private Category category;

    private Users users;

    public PostResponse(Integer id, String title, String subtitle, String content, Date createdDate, Category category, Users users) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.createdDate = createdDate;
        this.category = category;
        this.users = users;
    }

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.subtitle = post.getSubtitle();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.users = post.getUsers();
        this.createdDate = post.getCreatedDate();
    }

    @Override
    public String toString() {
        return "PostResponse{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", content='" + content + '\'' +
                ", createdDate=" + createdDate +
                ", category=" + category +
                ", users=" + users +
                '}';
    }
}
