package com.chamchi.backend.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentUpdateRequest {
    private Long id;
    private String content;
    private Date updateDt = new Date();
}
