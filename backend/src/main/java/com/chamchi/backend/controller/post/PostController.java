package com.chamchi.backend.controller.post;

import com.chamchi.backend.dto.post.PostRequest;
import com.chamchi.backend.dto.post.PostResponse;
import com.chamchi.backend.dto.post.PostUpdateRequest;
import com.chamchi.backend.service.post.image.ImageTempService;
import com.chamchi.backend.service.post.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final ImageTempService imageTempService;

    @GetMapping("/api/post")
    public List<PostResponse> getPosts(){
        return postService.getPosts();
    }

    @PostMapping("/api/post")
    public void savePost(@RequestBody PostRequest request){
        postService.savePost(request);
    }

    @PutMapping("/api/post")
    public void updatePost(@RequestBody PostUpdateRequest request){
        postService.updatePost(request);
    }

    @DeleteMapping("/api/post/{id}")
    public void deletePost(@PathVariable String id){
        postService.deletePost(id);
    }

    @PostMapping("/api/post/image")
    public String saveTempImage(@RequestParam("image")MultipartFile file) throws Exception {
        return imageTempService.saveTempImage(file);
    }

    @GetMapping("/api/post/search/{keyword}")
    public List<PostResponse> getPostsByKeyword(@PathVariable("keyword") String keyword){
        System.out.println("searchKeyword : " + keyword);
        return postService.getPostsByKeyword(keyword);
    }
}
