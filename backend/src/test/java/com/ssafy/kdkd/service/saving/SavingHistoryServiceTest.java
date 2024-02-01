// package com.ssafy.kdkd.service.saving;
//
// import com.ssafy.kdkd.domain.dto.saving.SavingHistoryDto;
// import com.ssafy.kdkd.domain.entity.saving.SavingHistory;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.child.ChildService;
//
// import static com.ssafy.kdkd.domain.entity.saving.SavingHistory.createSavingHistory;
// import static org.junit.Assert.*;
//
// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
//
// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.transaction.annotation.Transactional;
//
// import jakarta.persistence.EntityManager;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// @Transactional(readOnly = true)
// public class SavingHistoryServiceTest {
//
//     @Autowired SavingHistoryService savingHistoryService;
//     @Autowired ChildService childService;
//     @Autowired EntityManager em;
//
//     @Test
//     @Transactional
//     public void 적금내역_생성() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         //when
//         SavingHistoryDto savingHistoryDto = new SavingHistoryDto(1L, LocalDateTime.now(), "test detail", true, 0, 1L);
//         SavingHistory savingHistory = createSavingHistory(savingHistoryDto);
//         savingHistory.setChild(child);
//         savingHistoryService.save(savingHistory);
//         em.flush();
//
//         //then
//         List<SavingHistory> findSavingHistories = savingHistoryService.findSavingHistoriesByChild_Id(1L);
//         int size = findSavingHistories.size();
//
//         System.out.println("===== 내역 출력 =====");
//         for (SavingHistory sh : findSavingHistories) {
//             System.out.println("savingHistory_id: "+ sh.getId() +
//                 " dataLog: " + sh.getDataLog() +
//                 " detail: " + sh.getDetail() +
//                 " type: " + sh.isType() +
//                 " amount: " + sh.getAmount() +
//                 " child_id: " + sh.getChild().getId());
//         }
//         System.out.println("===== 내역 출력 =====");
//         assertEquals("내역 사이즈는 1입니다.", 1, size);
//     }
//
//     @Test
//     @Transactional
//     public void 적금내역_조회() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         List<SavingHistory> mySH = new ArrayList<>();
//         for (int i = 0; i < 100; i++) {
//             SavingHistory savingHistory = creatSH(i);
//             savingHistory.setChild(child);
//             mySH.add(savingHistory);
//         }
//         em.flush();
//
//         //when
//         List<SavingHistory> savingHistories = savingHistoryService.findSavingHistoriesByChild_Id(1L);
//
//         //then
//         int size = savingHistories.size();
//         System.out.println("===== 적금 내역 출력 =====");
//         for (SavingHistory savingHistory : savingHistories) {
//             System.out.println("savingHistory_id: "+ savingHistory.getId() +
//                 " dataLog: " + savingHistory.getDataLog() +
//                 " detail: " + savingHistory.getDetail() +
//                 " type: " + savingHistory.isType() +
//                 " amount: " + savingHistory.getAmount() +
//                 " child_id: " + savingHistory.getChild().getId());
//         }
//         System.out.println("===== 적금 내역 출력 =====");
//         assertEquals("적금 내역 사이즈는 100입니다.", 100, size);
//     }
//
//     private SavingHistory creatSH(int i) {
//         //내역 생성
//         SavingHistoryDto savingHistoryDto = new SavingHistoryDto(1L, LocalDateTime.now(), "test detail", true, 0, 1L);
//         SavingHistory savingHistory = createSavingHistory(savingHistoryDto);
//         em.persist(savingHistory);
//         return savingHistory;
//     }
// }