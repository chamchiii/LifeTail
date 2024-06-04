package com.chamchi.backend.service.post;

import com.chamchi.backend.customException.CustomUserException;
import com.chamchi.backend.domain.category.Category;
import com.chamchi.backend.domain.post.Post;
import com.chamchi.backend.domain.users.Users;
import com.chamchi.backend.dto.post.PostRequest;
import com.chamchi.backend.dto.post.PostResponse;
import com.chamchi.backend.dto.post.PostUpdateRequest;
import com.chamchi.backend.repository.post.PostRepository;
import com.chamchi.backend.repository.users.UsersRepository;
import com.chamchi.backend.service.post.image.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final UsersRepository usersRepository;
    private final ImageService imageService;

    @Value("${spring.resource-handler-temp-url}")
    private String resourceHandlerTempUrl;
    @Value("${spring.resource-handler-url}")
    private String resourceHandlerUrl;

    @Transactional(readOnly = true)
    public List<PostResponse> getPosts() {
        List<PostResponse> list = postRepository.findAllByIsDeletedOrderByIdDesc("N").orElse(Collections.emptyList()).stream().map(PostResponse::new).collect(Collectors.toList());
        return list;
    }

    @Transactional
    public void savePost(PostRequest request) {
        //임시저장 이미지 path -> 저장할 이미지 path 변경
        String changedContent = request.getContent().replaceAll(resourceHandlerTempUrl, resourceHandlerUrl);
        request.setContent(changedContent);
        Users users = usersRepository.findByUserId(request.getUserId()).orElseThrow(() -> new CustomUserException.NoUserDataException("아이디에 해당되는 유저가 없습니다."));
        Post post = postRepository.save(new Post(request, users.getId()));
        imageService.saveImage(post);
    }

    @Transactional
    public void updatePost(PostUpdateRequest request){
        Post post= postRepository.findById(request.getId()).orElseThrow(() -> new IllegalArgumentException("There is no DATA with id : " + request.getUserId()));
        Users users = usersRepository.findByUserId(request.getUserId()).orElseThrow(() -> new CustomUserException.NoUserDataException("아이디에 해당되는 유저가 없습니다."));
        post.setUsers(users);
        post.setTitle(request.getTitle());
        post.setSubtitle(request.getSubtitle());
        post.setContent(request.getContent());
        post.setCategory(new Category(request.getCategoryId()));
        post.setUpdatedDate(new Date());
        postRepository.save(post);
    }

    @Transactional
    public void deletePost(String id){
        Post post = postRepository.findByIdAndIsDeleted(Integer.parseInt(id), "N");
        post.setIsDeleted("Y");
        post.setDeletedDate(new Date());
        postRepository.save(post);
//        postRepository.deleteById(Integer.parseInt(id));
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByKeyword(String keyword){
        return postRepository.findAllByKeyword(keyword).orElse(Collections.emptyList()).stream().map(PostResponse::new).toList();
    }
}
