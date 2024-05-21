package com.chamchi.backend.service.post.image;

import com.chamchi.backend.domain.post.Post;
import com.chamchi.backend.domain.post.image.Image;
import com.chamchi.backend.domain.post.image.ImageTemp;
import com.chamchi.backend.repository.post.image.ImageRepository;
import com.chamchi.backend.repository.post.image.ImageTempRepository;
import com.chamchi.backend.util.FileMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final ImageTempRepository imageTempRepository;

    @Value("${spring.temp-image-directory}")
    private String sourceDirectory;
    @Value("${spring.image-directory}")
    private String destinationDirectory;

    @Transactional
    public void saveImage(Post post){
        List<Image> imageList = new ArrayList<>();
        List<String> imgSrcValueList = new ArrayList<>();

        String patternString = "<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>";
        Pattern pattern  =  Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(post.getContent());

        while (matcher.find()){
            String srcValue = matcher.group(1);
            //path제외 이미지 이름 추출 후 저장
            imgSrcValueList.add(srcValue.substring(srcValue.lastIndexOf("/") + 1 ));
        }

        for(String str : imgSrcValueList){
            //확장자 제외 이미지 이름 추출
            String imageName = str.split("\\.")[0];
            //임시저장 이미지 검색
            ImageTemp imageTemp = imageTempRepository.findByImageName(imageName);
            //이미지 복붙 시작
            FileMethod fileMethod = new FileMethod();
            //복붙 후의 path를 DB에 저장하기 위해 path 추출
            String savedImgPath = fileMethod.moveFile(imageTemp.getPath(), destinationDirectory);
            //복붙된 이미지 정보 DB에 저장
            Image image = new Image(post.getId(), imageTemp, savedImgPath);
            //임시테이블 데이터 삭제처리 업데이트
            imageTemp.setIsDeleted("Y");
            imageTempRepository.save(imageTemp);
            imageRepository.save(image);
        }
    }
}
