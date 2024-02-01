// package com.ssafy.kdkd.service.saving;
//
// import com.ssafy.kdkd.domain.dto.saving.SavingDto;
// import com.ssafy.kdkd.domain.entity.saving.Saving;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import static com.ssafy.kdkd.domain.entity.saving.Saving.createSaving;
// import static org.junit.Assert.*;
//
// import java.time.LocalDateTime;
// import java.util.NoSuchElementException;
//
// import jakarta.persistence.EntityManager;
//
// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Rollback;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.transaction.annotation.Transactional;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// @Transactional(readOnly = true)
// public class SavingServiceTest {
//
//     @Autowired
//     SavingService savingService;
//     @Autowired
//     ChildService childService;
//     @Autowired
//     EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 적금_스케줄러() throws Exception {
//         System.out.println("==== updateSaving ====");
//         savingService.updateSaving();
//         System.out.println("==== updateSaving ====");
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 적금_생성() throws Exception {
//         //given
//         Long childId = 1L;
//         Child child = childService.findChild(childId).get();
//
//         //when
//         SavingDto savingDto = new SavingDto(LocalDateTime.now(), 5, 50000, 1, childId);
//         Saving saving = createSaving(savingDto);
//         saving.setChild(child);
//         savingService.save(saving);
//         em.flush();
//         em.clear();
//
//         //then
//         Saving findSaving = savingService.findById(childId).get();
//         System.out.println("===== 적금 정보 출력 =====");
//         System.out.println("findSaving_id: " + findSaving.getId() +
//             " start_date: " + findSaving.getStartDate() +
//             " count: " + findSaving.getCount() +
//             " payment: " + findSaving.getPayment() +
//             " rate: " + findSaving.getRate());
//         System.out.println("===== 적금 정보 출력 =====");
//
//         assertEquals("적금에 자식 아이디가 동일해야 합니다.", childId, findSaving.getId());
//     }
//
//     @Test
//     public void 적금_조회() throws Exception {
//         //given
//         Long childId = 1L;
//
//         //when
//         Saving findSaving = savingService.findById(childId).get();
//
//         //then
//         System.out.println("===== 적금 정보 출력 =====");
//         System.out.println("findSaving_id: " + findSaving.getId() +
//             " start_date: " + findSaving.getStartDate() +
//             " count: " + findSaving.getCount() +
//             " payment: " + findSaving.getPayment() +
//             " rate: " + findSaving.getRate());
//         System.out.println("===== 적금 정보 출력 =====");
//
//         assertEquals("적금에 자식 아이디가 동일해야 합니다.", childId, findSaving.getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 적금_업데이트() throws Exception {
//         //given
//         Long childId = 1L;
//         Saving existingSaving = savingService.findById(childId).get();
//
//         //when
//         existingSaving.updateSaving(existingSaving.getCount() - 1);
//         em.flush();
//         em.clear();
//
//         //then
//         Saving findSaving = savingService.findById(childId).get();
//         System.out.println("===== 적금 정보 출력 =====");
//         System.out.println("findSaving_id: " + findSaving.getId() +
//             " start_date: " + findSaving.getStartDate() +
//             " count: " + findSaving.getCount() +
//             " payment: " + findSaving.getPayment() +
//             " rate: " + findSaving.getRate());
//         System.out.println("===== 적금 정보 출력 =====");
//
//         assertEquals("적금에 자식 아이디가 동일해야 합니다.", childId, findSaving.getId());
//     }
//
//     @Test(expected = NoSuchElementException.class)
//     @Transactional
//     @Rollback(value = false)
//     public void 적금_삭제() throws Exception {
//         //given
//         Long childId = 1L;
//         Saving existingSaving = savingService.findById(childId).get();
//
//         //when
//         savingService.delete(existingSaving);
//         em.flush();
//         em.clear();
//
//         //then
//         existingSaving = savingService.findById(childId).get();
//
//         fail("적금이 없어야 합니다.");
//     }
// }