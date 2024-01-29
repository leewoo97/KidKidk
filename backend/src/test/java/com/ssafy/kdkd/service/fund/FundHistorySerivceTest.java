// package com.ssafy.kdkd.service.fund;
//
// import static com.ssafy.kdkd.domain.entity.fund.FundHistory.createFundHistory;
// import static org.junit.Assert.assertEquals;
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
// import com.ssafy.kdkd.domain.dto.fund.FundHistoryDto;
// import com.ssafy.kdkd.domain.entity.fund.FundHistory;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import jakarta.persistence.EntityManager;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// @Transactional(readOnly = true)
// public class FundHistorySerivceTest {
//
//     @Autowired
//     FundHistoryService fundHistorySerivce;
//     @Autowired ChildService childService;
//     @Autowired EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 내역_생성() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         //when
//         FundHistoryDto fundHistoryDto = new FundHistoryDto(1L, LocalDateTime.now(), 0, 0, 0, 1L);
//         FundHistory fundHistory = createFundHistory(fundHistoryDto);
//         fundHistory.setChild(child);
//         fundHistorySerivce.save(fundHistory);
//         em.flush();
//
//         //then
//         List<FundHistory> findFundHistories = fundHistorySerivce.findFundHistoryByChildId(1L);
//         int size = findFundHistories.size();
//
//         System.out.println("===== 투자 내역 출력 =====");
//         for (FundHistory fh : findFundHistories) {
//             System.out.println("fundHistory_id: "+ fh.getId() +
//                 " dataLog: " + fh.getDataLog() +
//                 " seedMoney: " + fh.getSeedMoney() +
//                 " yield: " + fh.getYield() +
//                 " pnl: " + fh.getPnl() +
//                 " child_id: " + fh.getChild().getId());
//         }
//         System.out.println("===== 투자 내역 출력 =====");
//         assertEquals("내역 사이즈는 1입니다.", 1, size);
//     }
//
//     @Test
//     @Transactional
//     public void 내역_조회() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         List<FundHistory> myFH = new ArrayList<>();
//         for (int i = 0; i < 100; i++) {
//             FundHistory fundHistory = createFH();
//             fundHistory.setChild(child);
//             myFH.add(fundHistory);
//         }
//         em.flush();
//
//         //when
//         List<FundHistory> fundHistories = fundHistorySerivce.findFundHistoryByChildId(1L);
//
//         //then
//         int size = fundHistories.size();
//         System.out.println("===== 투자 내역 출력 =====");
//         for (FundHistory fundHistory : fundHistories) {
//             System.out.println("fundHistory_id: "+ fundHistory.getId() +
//                 " dataLog: " + fundHistory.getDataLog() +
//                 " seedMoney: " + fundHistory.getSeedMoney() +
//                 " yield: " + fundHistory.getYield() +
//                 " pnl: " + fundHistory.getPnl() +
//                 " child_id: " + fundHistory.getChild().getId());
//         }
//         System.out.println("===== 투자 내역 출력 =====");
//         assertEquals("투자 내역 사이즈는 100입니다.", 100, size);
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 내역_벌크_삭제() throws Exception {
//         //given
//         Long childId = 1L;
//         int s = 0;
//
//         //when
//         fundHistorySerivce.deleteAllByChildId(childId);
//
//         //then
//         List<FundHistory> fundHistories = fundHistorySerivce.findFundHistoryByChildId(childId);
//         int size = fundHistories.size();
//         assertEquals("투자 내역 사이즈는 0입니다.", s, size);
//     }
//
//
//     private FundHistory createFH() {
//         //내역 생성
//         FundHistoryDto fundHistoryDto = new FundHistoryDto(1L, LocalDateTime.now(), 0, 0, 0, 1L);
//         FundHistory fundHistory = createFundHistory(fundHistoryDto);
//         em.persist(fundHistory);
//         return fundHistory;
//     }
//
// }