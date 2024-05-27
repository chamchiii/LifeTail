package com.chamchi.backend.repository.comment;

import com.chamchi.backend.domain.commnent.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Optional<List<Comment>> findByPostIdAndIsDeleted(Integer postId, String isDelete);

    Optional<Comment> findById(Integer id);
}
