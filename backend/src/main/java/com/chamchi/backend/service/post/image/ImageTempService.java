package com.chamchi.backend.service.post.image;

import com.chamchi.backend.domain.post.image.ImageTemp;
import com.chamchi.backend.repository.post.image.ImageTempRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageTempService {

    @Value("${spring.temp-image-directory}")
    private String directory;

    @Value("${spring.resource-handler-temp-url}")
    private String resourceHandlerTempUrl;

    private final ImageTempRepository imageTempRepository;

    @Transactional
    public String saveTempImage(MultipartFile file) throws Exception {
        String originImageName; //Original Name
        String imageName;       //UUID Name
        String imageUrl;        //path/UUID.extension

        originImageName = file.getOriginalFilename();
        if (originImageName == null || originImageName.isEmpty()) {
            throw new IllegalArgumentException();
        }

        String extension = originImageName.substring(originImageName.lastIndexOf(".") + 1);
        imageName = UUID.randomUUID().toString();   //UUID 생성
        imageUrl = this.directory + imageName + "." + extension;      //디렉토리/UUID.jpg

        File imageFile = new File(directory);   //디렉토리 생성
        BufferedImage bufferedImage = ImageIO.read(file.getInputStream());  // 이미지 읽기
        String imageUrlWithoutExtension = this.directory + imageName + "." + extension; //이미지 저장될 경로 및 이름 지정
        ImageIO.write(bufferedImage, extension, new File(imageUrlWithoutExtension));    //저장

        //DB 임시사진 테이블에 저장
        imageTempRepository.save(new ImageTemp(originImageName, imageName, imageUrl, extension));

        return resourceHandlerTempUrl + imageName + "." + extension;
    }
}
