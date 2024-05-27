package com.chamchi.backend.domain.commnent;

import com.chamchi.backend.domain.post.Post;
import com.chamchi.backend.dto.comment.CommentRequest;
import com.chamchi.backend.dto.comment.CommentUpdateRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_id_seq")
    @SequenceGenerator(name = "comment_id_seq", sequenceName = "comment_id_seq", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private String writer;

    private String password;

    private String content;

    private Date createDt;

    private Date updateDt;

    private Date deleteDt;

    private String isDeleted;

    public Comment(CommentRequest request){
        this.post = new Post(request.getPostId());
        this.writer = request.getWriter();
        this.password = request.getPassword();
        this.content = request.getContent();
    }

    public Comment(CommentUpdateRequest request){
        this.id = request.getId();
        this.content = request.getContent();
        this.updateDt = request.getUpdateDt();
    }
}
