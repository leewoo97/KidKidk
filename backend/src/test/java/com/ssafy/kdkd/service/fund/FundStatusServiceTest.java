// package com.ssafy.kdkd.service.fund;
//
// import static com.ssafy.kdkd.domain.entity.fund.FundStatus.createFundStatus;
// import static org.junit.Assert.*;
//
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
// import com.ssafy.kdkd.domain.entity.fund.Fund;
// import com.ssafy.kdkd.domain.entity.fund.FundStatus;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import jakarta.persistence.EntityManager;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// @Transactional(readOnly = true)
// public class FundStatusServiceTest {
//
//     @Autowired
//     FundStatusService fundStatusService;
//     @Autowired FundService fundService;
//     @Autowired
//     ChildService childService;
//     @Autowired
//     EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 상태_조회() throws Exception {
//         //given
//         Long fundId = 1L;
//
//         //when
//         FundStatus findFundStatus = fundStatusService.findById(fundId).get();
//
//         //then
//         System.out.println("===== 투자 상태 출력 =====");
//         System.out.println("fund_status_id: "+ findFundStatus.getFund().getId() +
//             " submit: " + findFundStatus.isSubmit() +
//             " answer: " + findFundStatus.isAnswer());
//         System.out.println("===== 투자 상태 출력 =====");
//         assertEquals("찾은 FundStatus의 아이디는 fundId와 같아야 합니다.", fundId, findFundStatus.getFund().getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 상태_생성() throws Exception {
//         //given
//         Long childId = 1L;
//         Fund findFund = fundService.findById(childId).get();
//         Long fundId = findFund.getId();
//
//         //when
//         FundStatus fundStatus = createFundStatus(true, true);
//         fundStatus.setFund(findFund);
//         em.persist(fundStatus);
//         em.flush();
//         em.clear();
//
//         //then
//         FundStatus findFundStatus = fundStatusService.findById(fundId).get();
//
//         System.out.println("===== 투자 상태 출력 =====");
//         System.out.println("fund_status_id: "+ findFundStatus.getFund().getId() +
//             " submit: " + findFundStatus.isSubmit() +
//             " answer: " + findFundStatus.isAnswer());
//         System.out.println("===== 투자 상태 출력 =====");
//         assertEquals("찾은 FundStatus의 아이디는 fundId와 같아야 합니다.", fundId, findFundStatus.getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 상태_전체_조회() throws Exception {
//         //given
//         int s = 1;
//
//         //when
//         List<FundStatus> findFundStatuses = fundStatusService.findAll();
//         int size = findFundStatuses.size();
//         em.flush();
//         em.clear();
//
//         //then
//         for (FundStatus findFundStatus : findFundStatuses) {
//             System.out.println("===== 투자 상태 출력 =====");
//             System.out.println("fund_status_id: "+ findFundStatus.getFund().getId() +
//                 " submit: " + findFundStatus.isSubmit() +
//                 " answer: " + findFundStatus.isAnswer());
//             System.out.println("===== 투자 상태 출력 =====");
//         }
//
//         assertEquals("모두 찾아와야합니다.", s, size);
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 상태_벌크_삭제() throws Exception {
//         //when
//         fundStatusService.deleteAll();
//
//         //then
//         List<FundStatus> findFundStatuses = fundStatusService.findAll();
//         int size = findFundStatuses.size();
//         em.flush();
//         em.clear();
//
//         assertEquals("사이즈가 0 이어야 합니다.", 0, size);
//     }
//
// }