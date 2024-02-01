// package com.ssafy.kdkd.service.job;
//
// import static com.ssafy.kdkd.domain.entity.job.Job.createJob;
// import static com.ssafy.kdkd.domain.entity.job.JobReservation.createJobReservation;
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
// import com.ssafy.kdkd.domain.dto.job.JobReservationDto;
// import com.ssafy.kdkd.domain.entity.job.Job;
// import com.ssafy.kdkd.domain.entity.job.JobInfo;
// import com.ssafy.kdkd.domain.entity.job.JobReservation;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import jakarta.persistence.EntityManager;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// @Transactional(readOnly = true)
// public class JobReservationServiceTest {
//
//     @Autowired JobReservationService jobReservationService;
//     @Autowired ChildService childService;
//     @Autowired EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 직업예약_생성() throws Exception {
//         //given
//         Long childId = 1L;
//         Child child = childService.findChild(childId).get();
//
//         //when
//         JobReservationDto jobReservationDto = new JobReservationDto("test 직업", 500, "강아지 미용사", 5, true, childId);
//         JobReservation jobReservation = createJobReservation(jobReservationDto);
//         jobReservation.setChild(child);
//         jobReservationService.save(jobReservation);
//         em.flush();
//         em.clear();
//
//         //then
//         JobReservation findJobReservation = jobReservationService.findById(childId).get();
//
//         System.out.println("===== 직업예약 정보 출력 =====");
//         System.out.println("job_id: " + findJobReservation.getId() +
//             " jobInfo: " + findJobReservation.getJobInfo().toString() +
//             " state: " + findJobReservation.isState());
//         System.out.println("===== 직업예약 정보 출력 =====");
//
//         assertEquals("직업예약에 자식 아이디가 동일해야 합니다.", childId, findJobReservation.getId());
//     }
//
//     @Test
//     public void 직업예약_조회() throws Exception {
//         //given
//         Long childId = 1L;
//
//         //when
//         JobReservation findJobReservation = jobReservationService.findById(childId).get();
//
//         //then
//         System.out.println("===== 직업예약 정보 출력 =====");
//         System.out.println("job_id: " + findJobReservation.getId() +
//             " jobInfo: " + findJobReservation.getJobInfo().toString() +
//             " state: " + findJobReservation.isState());
//         System.out.println("===== 직업예약 정보 출력 =====");
//
//         assertEquals("직업예약에 자식 아이디가 동일해야 합니다.", childId, findJobReservation.getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 직업예약_업데이트() throws Exception {
//         //given
//         Long childId = 1L;
//         JobReservation existingJobReservation = jobReservationService.findById(childId).get();
//
//         //when
//         JobInfo jobInfo = existingJobReservation.getJobInfo();
//
//         JobReservationDto jobReservationDto = new JobReservationDto(jobInfo.getName(), 1000, "고양이 미용사", 2, true, childId);
//         existingJobReservation.updateJobReservation(jobReservationDto);
//         jobReservationService.save(existingJobReservation);
//         em.flush();
//         em.clear();
//
//         //then
//         JobReservation findJobReservation = jobReservationService.findById(childId).get();
//         System.out.println("===== 직업예약 정보 출력 =====");
//         System.out.println("job_id: " + findJobReservation.getId() +
//             " jobInfo: " + findJobReservation.getJobInfo().toString() +
//             " state: " + findJobReservation.isState());
//         System.out.println("===== 직업예약 정보 출력 =====");
//
//         assertEquals("직업예약에 자식 아이디가 동일해야 합니다.", childId, findJobReservation.getId());
//     }
//
//     @Test(expected = NoSuchElementException.class)
//     @Transactional
//     @Rollback(value = false)
//     public void 직업예약_삭제() throws Exception {
//         //given
//         Long childId = 1L;
//         JobReservation findJobReservation = jobReservationService.findById(childId).get();
//
//         //when
//         jobReservationService.delete(findJobReservation);
//         em.flush();
//         em.clear();
//
//         //then
//         findJobReservation = jobReservationService.findById(childId).get();
//         System.out.println("===== 직업예약 정보 출력 =====");
//         System.out.println("job_id: " + findJobReservation.getId() +
//             " jobInfo: " + findJobReservation.getJobInfo().toString() +
//             " state: " + findJobReservation.isState());
//         System.out.println("===== 직업예약 정보 출력 =====");
//
//         assertEquals("직업예약에 자식 아이디가 동일해야 합니다.", childId, findJobReservation.getId());
//
//         fail("직업예약이 없어야 합니다.");
//     }
// }