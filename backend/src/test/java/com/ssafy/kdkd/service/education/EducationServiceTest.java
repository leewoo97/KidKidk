package com.ssafy.kdkd.service.education;

import com.ssafy.kdkd.domain.common.Category;
import com.ssafy.kdkd.domain.entity.education.Education;

import jakarta.persistence.EntityManager;

import static com.ssafy.kdkd.domain.entity.education.Education.createEducation;
import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(readOnly = true)
public class EducationServiceTest {
    @Autowired EducationService educationService;
    @Autowired EntityManager em;
    @Test

    @Transactional
    public void 교육_테스트() throws Exception {
        //given
        List<Education> myE = new ArrayList<>();


        for (int i = 0; i < 100; i++) {
            myE.add(createE());
        }
        em.flush();
        //when
        List<Education> educations = educationService.findAll();
        //then
        int size = educations.size();
        System.out.println("===== 교육 출력 =====");
        for (Education education : educations) {
            System.out.println("education_id: " + education.getId() +
                " category: " + education.getCategory() +
                " content: " + education.getContent());
        }
        System.out.println("===== 교육 출력 =====");
        assertEquals("교육 자료의 사이즈는 100입니다.", 100, size);
    }
    private Education createE() {
        Category category = Category.FUND;
        String content = "교육 자료 입니다.";
        Education education = createEducation(category, content);
        em.persist(education);
        return education;
    }
}
