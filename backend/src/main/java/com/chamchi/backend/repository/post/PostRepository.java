package com.chamchi.backend.repository.post;

import com.chamchi.backend.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findAllByOrderByIdDesc();

    Optional<List<Post>> findAllByIsDeletedOrderByIdDesc(String isDeleted);

    Post findByIdAndIsDeleted(Long id, String isDeleted);

    @Query("SELECT p FROM Post p INNER JOIN Users u ON p.users.id = u.id INNER JOIN Category c ON p.category.id = c.id WHERE p.isDeleted = 'N' AND (p.title || p.subtitle || regexp_replace(p.content, '<[^>]+>', '', 'g')) LIKE CONCAT('%',TRIM(:keyword),'%') ORDER BY p.id desc")
    Optional<List<Post>> findAllByKeyword(@Param("keyword") String keyword);
}
