package com.chamchi.backend.controller.comment;

import com.chamchi.backend.dto.comment.CommentRequest;
import com.chamchi.backend.dto.comment.CommentResponse;
import com.chamchi.backend.dto.comment.CommentUpdateRequest;
import com.chamchi.backend.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/api/comment")
    public void saveComment(@RequestBody CommentRequest request){
        commentService.saveComment(request);
    }

    @GetMapping("/api/comment/{postId}")
    public List<CommentResponse> getCommentByPostId(@PathVariable("postId") String postId){
        return commentService.getCommentByPostId(postId);
    }

    @PutMapping("/api/comment")
    public void updateComment(@RequestBody CommentUpdateRequest request){
        commentService.updateComment(request);
    }

    @DeleteMapping("/api/comment/{commentId}")
    public void deleteComment(@PathVariable("commentId") String commentId){
        commentService.deleteComment(commentId);
    }
}
