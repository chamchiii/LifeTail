package com.chamchi.backend.service.comment;

import com.chamchi.backend.domain.commnent.Comment;
import com.chamchi.backend.dto.comment.CommentRequest;
import com.chamchi.backend.dto.comment.CommentResponse;
import com.chamchi.backend.dto.comment.CommentUpdateRequest;
import com.chamchi.backend.repository.comment.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public void saveComment(CommentRequest request) {
        Comment comment = commentRepository.save(new Comment(request));
    }

    public List<CommentResponse> getCommentByPostId(String postId) {
        List<CommentResponse> list = commentRepository.findByPostIdAndIsDeleted(Long.parseLong(postId), "N")
                .orElseThrow(IllegalArgumentException::new)
                .stream().map(CommentResponse::new).toList();

        return list;
    }

    public void updateComment(CommentUpdateRequest request){
        Comment comment = commentRepository.findById(request.getId()).orElseThrow(IllegalArgumentException::new);
        comment.setContent(request.getContent());
        comment.setUpdateDt(request.getUpdateDt());
        commentRepository.save(comment);
    }

    public void deleteComment(String commentId){
        Comment comment = commentRepository.findById(Long.parseLong(commentId)).orElseThrow(IllegalArgumentException::new);
        comment.setIsDeleted("Y");
        comment.setDeleteDt(new Date());
        commentRepository.save(comment);
    }
}
