package com.ssafy.kdkd.service.quiz;

import com.ssafy.kdkd.domain.common.Category;
import com.ssafy.kdkd.domain.entity.quiz.Quiz;

import java.util.List;
import java.util.ArrayList;

import static com.ssafy.kdkd.domain.entity.quiz.Quiz.createQuiz;
import static org.junit.Assert.*;

import jakarta.persistence.EntityManager;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(readOnly = true)
public class QuizServiceTest {
    @Autowired QuizService quizService;
    @Autowired EntityManager em;
    @Test
    @Transactional
    public void 퀴즈_테스트() throws Exception {
        //given
        List<Quiz> myQ = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            myQ.add(createQ());
        }
        em.flush();
        //when
        List<Quiz> quizzes = quizService.findAll();
        //then
        int size = quizzes.size();
        System.out.println("===== 퀴즈 출력 =====");
        for (Quiz quiz : quizzes) {
            System.out.println("quiz_id: "+ quiz.getId() +
                " category: " + quiz.getCategory() +
                " question: " + quiz.getQuestion() +
                " answer: " + quiz.isAnswer());
        }
        System.out.println("===== 퀴즈 출력 =====");
        assertEquals("퀴즈 사이즈는 2입니다.", 2, size);
    }
    private Quiz createQ() {
        Category category = Category.COIN;
        String question = "질문 입니다.";
        boolean answer = true;
        Quiz quiz = createQuiz(category, question, answer);
        em.persist(quiz);
        return quiz;
    }
}
