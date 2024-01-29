// package com.ssafy.kdkd.service;
//
// import com.ssafy.kdkd.domain.dto.Deposit.DepositDto;
// import com.ssafy.kdkd.domain.entity.deposit.Deposit;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.Deposit.DepositService;
//
// import static com.ssafy.kdkd.domain.entity.deposit.Deposit.createDeposit;
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
// public class DepositServiceTest {
//
//     @Autowired
//     DepositService depositService;
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
//         DepositDto depositDto = new DepositDto(LocalDateTime.now(), "test detail", true, 1, 1, 1L);
//         Deposit deposit = createDeposit(depositDto);
//         deposit.setChild(child);
//         depositService.save(deposit);
//         em.flush();
//
//         //then
//         List<Deposit> findDeposits = depositService.findDepositByChildId(1L);
//         int size = findDeposits.size();
//
//         System.out.println("===== 내역 출력 =====");
//         for (Deposit d : findDeposits) {
//             System.out.println("deposit_id: "+ d.getId() +
//                 " dataLog: " + d.getDataLog() +
//                 " detail: " + d.getDetail() +
//                 " type: " + d.isType() +
//                 " amount: " + d.getAmount() +
//                 " money: " + d.getMoney() +
//                 " child_id: " + d.getChild().getId());
//         }
//         System.out.println("===== 내역 출력 =====");
//         assertEquals("내역 사이즈는 1입니다.", 1, size);
//     }
//
//     @Test
//     @Transactional
//     public void 내역_조회() throws Exception {
//         //given
//         Child child = childService.findChild(1L).get();
//
//         List<Deposit> myD = new ArrayList<>();
//         for (int i = 0; i < 100; i++) {
//             Deposit deposit = createD(i);
//             deposit.setChild(child);
//             myD.add(deposit);
//         }
//         em.flush();
//
//         //when
//         List<Deposit> deposits = depositService.findDepositByChildId(1L);
//
//         //then
//         int size = deposits.size();
//         System.out.println("===== 내역 출력 =====");
//         for (Deposit deposit : deposits) {
//             System.out.println("deposit_id: "+ deposit.getId() +
//                 " dataLog: " + deposit.getDataLog() +
//                 " detail: " + deposit.getDetail() +
//                 " type: " + deposit.isType() +
//                 " amount: " + deposit.getAmount() +
//                 " money: " + deposit.getMoney() +
//                 " child_id: " + deposit.getChild().getId());
//         }
//         System.out.println("===== 내역 출력 =====");
//         assertEquals("내역 사이즈는 100입니다.", 100, size);
//     }
//
//     @Test
//     public void 자식_조회() throws Exception {
//         System.out.println("===== 자식 조회 =====");
//         Child child = childService.findChild(1L).get();
//         System.out.println("child_id: " + child.getId() + " coin: " +child.getCoin() + " fund_money: " + child.getFundMoney());
//         System.out.println("===== 자식 조회 =====");
//     }
//
//     private Deposit createD(int i) {
//         //내역 생성
//         DepositDto depositDto = new DepositDto(LocalDateTime.now(), "test detail"+i, true, 1, 1, 1L);
//         Deposit deposit = createDeposit(depositDto);
//         em.persist(deposit);
//         return deposit;
//     }
// }