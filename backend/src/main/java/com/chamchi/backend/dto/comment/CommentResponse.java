package com.chamchi.backend.dto.comment;

import com.chamchi.backend.domain.commnent.Comment;
import com.chamchi.backend.domain.post.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private Long postId;
    private String writer;
    private String password;
    private String content;
    private Date createDt;
    private Date updateDt;

    public CommentResponse(Comment comment){
        this.id = comment.getId();
        this.postId = comment.getPost().getId();
        this.writer = comment.getWriter();
        this.password = comment.getPassword();
        this.content = comment.getContent();
        this.createDt = comment.getCreateDt();
        this.updateDt = comment.getUpdateDt();
    }
}
