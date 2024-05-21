package com.chamchi.backend.domain.post;

import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.domain.users.Users;
import com.chamchi.backend.dto.post.PostRequest;
import com.chamchi.backend.dto.post.PostUpdateRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Post {

    //글 번호(sequence)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_id_seq")
    @SequenceGenerator(name = "post_id_seq", sequenceName = "post_id_seq", allocationSize = 1)
    private Long id;

    private String title;

    private String subtitle;

    private String content;

    private Date createdDate;

    private String isDeleted;

    private Date updatedDate;

    private Date deletedDate;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    public Post(Long id){
        this.id = id;
    }

    public Post(Long id, String title,String subtitle, String content, Category category, Users users, Date date) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.category = category;
        this.users = users;
        this.createdDate = date;
    }

    public Post(PostRequest request) {
        this.title = request.getTitle();
        this.content = request.getContent();
        this.subtitle = request.getSubtitle();
        this.category = new Category();
        this.category.setId(request.getCategoryId());
        this.users = new Users();
        this.users.setId(request.getUserId());
    }

}
