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
public class ImageTemp {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_temp_id_seq")
    @SequenceGenerator(name = "image_temp_id_seq", sequenceName = "image_temp_id_seq", allocationSize = 1)
    private Integer id;

    private String originName;

    private String imageName;

    private String path;

    private String extension;


    private String isDeleted;

    public ImageTemp(String originImageName, String uuid, String path, String extension)  {
        this.originName = originImageName;
        this.imageName = uuid;
        this.path = path;
        this.extension = extension;
    }
}
