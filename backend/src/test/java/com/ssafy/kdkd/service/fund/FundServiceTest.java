// package com.ssafy.kdkd.service.fund;
//
// import com.ssafy.kdkd.domain.dto.fund.FundReservationDto;
// import com.ssafy.kdkd.domain.entity.fund.Fund;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import static com.ssafy.kdkd.domain.entity.fund.Fund.createFund;
// import static org.junit.Assert.*;
//
// import java.util.NoSuchElementException;
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
// public class FundServiceTest {
//
//     @Autowired FundService fundService;
//     @Autowired ChildService childService;
//     @Autowired EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 투자_생성() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         //when
//         FundReservationDto fundReservationDto = new FundReservationDto(1L, "test fund", "test content", 0, true, 1L);
//         Fund fund = createFund(fundReservationDto);
//         fund.setChild(child);
//         fundService.save(fund);
//         em.flush();
//
//         //then
//         Fund findFund = fundService.findById(1L).get();
//
//         System.out.println("===== 투자 정보 출력 =====");
//         System.out.println("fund_id: " + findFund.getId() +
//                         " name: " + findFund.getName() +
//                         " content: " + findFund.getContent() +
//                         " yield: " +findFund.getYield());
//         System.out.println("===== 투자 정보 출력 =====");
//
//         assertEquals("투자에 자식 아이디가 동일해야 합니다.", "test fund", findFund.getName());
//     }
//
//     @Test
//     public void 투자_조회() throws Exception {
//         //given
//         Long childId = 1L;
//
//         //when
//         Fund findFund = fundService.findById(childId).get();
//
//         //then
//         System.out.println("===== 투자 정보 출력 =====");
//         System.out.println("fund_id: " + findFund.getId() +
//             " name: " + findFund.getName() +
//             " content: " + findFund.getContent() +
//             " yield: " +findFund.getYield());
//         System.out.println("===== 투자 정보 출력 =====");
//         Long findChildId = findFund.getChild().getId();
//
//         assertEquals("투자에 자식 아이디가 동일해야 합니다.", childId, findChildId);
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 투자_수정() throws Exception {
//         //given
//         Long childId = 1L;
//         Fund existingFund = fundService.findById(childId).get();
//
//         //when
//
//         existingFund.updateFund(new FundReservationDto(1L, "새로운 투자", existingFund.getContent(), existingFund.getYield(), true, 1L));
//         em.flush();
//         em.clear();
//
//         //then
//         Fund findModifiedFund = fundService.findById(childId).get();
//         System.out.println("===== 투자 정보 출력 =====");
//         System.out.println("fund_id: " + findModifiedFund.getId() +
//             " name: " + findModifiedFund.getName() +
//             " content: " + findModifiedFund.getContent() +
//             " yield: " + findModifiedFund.getYield() +
//             " child_id: " + findModifiedFund.getChild().getId());
//         System.out.println("===== 투자 정보 출력 =====");
//
//         assertEquals("투자에 자식 아이디가 동일해야 합니다.", childId, findModifiedFund.getChild().getId());
//     }
//
//     @Test(expected = NoSuchElementException.class)
//     @Transactional
//     @Rollback(value = false)
//     public void 투자_삭제() throws Exception {
//         //given
//         Long childId = 1L;
//         Fund findFund = fundService.findById(childId).get();
//
//         //when
//         fundService.delete(findFund);
//         em.flush();
//         em.clear();
//
//         //then
//         findFund = fundService.findById(childId).get();
//         System.out.println("===== 투자 정보 출력 =====");
//         System.out.println("fund_id: " + findFund.getId() +
//             " name: " + findFund.getName() +
//             " content: " + findFund.getContent() +
//             " yield: " + findFund.getYield() +
//             " child_id: " + findFund.getChild().getId());
//         System.out.println("===== 투자 정보 출력 =====");
//
//         fail("투자가 없어야 합니다.");
//     }
// }