package com.chamchi.backend.domain.post.image;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_id_seq")
    @SequenceGenerator(name = "image_id_seq", sequenceName = "image_id_seq", allocationSize = 1)
    private Integer id;

    private Integer postId;
    //UUID가 적용되지 않은 name
    private String originName;

    private String imageName;

    private String path;

    private String extension;

    private String idDeleted;

    public Image(Integer postId, String originName, String imageName, String path, String extension) {
        this.postId = postId;
        this.originName = originName;
        this.imageName = imageName;
        this.path = path;
        this.extension = extension;
    }

    public Image(Integer postId, ImageTemp imageTemp, String path){
        this.postId = postId;
        this.originName = imageTemp.getOriginName();
        this.imageName = imageTemp.getImageName();
        this.extension = imageTemp.getExtension();
        this.path = path;
    }
}
