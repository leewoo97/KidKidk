// package com.ssafy.kdkd.service.job;
//
// import com.ssafy.kdkd.domain.dto.job.JobReservationDto;
// import com.ssafy.kdkd.domain.entity.job.Job;
// import com.ssafy.kdkd.domain.entity.job.JobInfo;
// import com.ssafy.kdkd.domain.entity.user.Child;
// import com.ssafy.kdkd.service.user.ChildService;
//
// import static com.ssafy.kdkd.domain.entity.job.Job.createJob;
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
// public class JobServiceTest {
//
//     @Autowired JobService jobService;
//     @Autowired ChildService childService;
//     @Autowired EntityManager em;
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 직업_생성() throws Exception {
//         //given
//         Long childId = 1L;
//         Child child = childService.findChild(childId).get();
//
//         //when
//         JobReservationDto jobReservationDto = new JobReservationDto("test 직업", 500, "강아지 미용사", 5, true, childId);
//         Job job = createJob(jobReservationDto);
//         job.setChild(child);
//         jobService.save(job);
//         em.flush();
//         em.clear();
//
//         //then
//         Job findJob = jobService.findById(childId).get();
//
//         System.out.println("===== 직업 정보 출력 =====");
//         System.out.println("job_id: " + findJob.getId() +
//             " jobInfo: " + findJob.getJobInfo().toString() +
//             " done_count: " + findJob.getDoneCount());
//         System.out.println("===== 직업 정보 출력 =====");
//
//         assertEquals("직업에 자식 아이디가 동일해야 합니다.", childId, findJob.getId());
//     }
//
//     @Test
//     public void 직업_조회() throws Exception {
//         //given
//         Long childId = 1L;
//
//         //when
//         Job findJob = jobService.findById(childId).get();
//
//         //then
//         System.out.println("===== 직업 정보 출력 =====");
//         System.out.println("job_id: " + findJob.getId() +
//             " jobInfo: " + findJob.getJobInfo().toString() +
//             " done_count: " + findJob.getDoneCount());
//         System.out.println("===== 직업 정보 출력 =====");
//
//         assertEquals("직업에 자식 아이디가 동일해야 합니다.", childId, findJob.getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 직업_업데이트_예약() throws Exception {
//         //given
//         Long childId = 1L;
//         Job existingJob = jobService.findById(childId).get();
//
//         //when
//         JobInfo jobInfo = existingJob.getJobInfo();
//
//         JobReservationDto jobReservationDto = new JobReservationDto(jobInfo.getName(), 1000, "강아지 미용사", 2, true, childId);
//         existingJob.updateJob(jobReservationDto);
//         jobService.save(existingJob);
//         em.flush();
//         em.clear();
//
//         //then
//         Job findJob = jobService.findById(childId).get();
//         System.out.println("===== 직업 정보 출력 =====");
//         System.out.println("job_id: " + findJob.getId() +
//             " jobInfo: " + findJob.getJobInfo().toString() +
//             " done_count: " + findJob.getDoneCount());
//         System.out.println("===== 직업 정보 출력 =====");
//
//         assertEquals("직업에 자식 아이디가 동일해야 합니다.", childId, findJob.getId());
//     }
//
//     @Test
//     @Transactional
//     @Rollback(value = false)
//     public void 직업_업데이트_업무수행() throws Exception {
//         //given
//         Long childId = 1L;
//         Job existingJob = jobService.findById(childId).get();
//
//         //when
//         existingJob.updateJob(existingJob.getDoneCount() + 1);
//         jobService.save(existingJob);
//         em.flush();
//         em.clear();
//
//         //then
//         Job findJob = jobService.findById(childId).get();
//         System.out.println("===== 직업 정보 출력 =====");
//         System.out.println("job_id: " + findJob.getId() +
//             " jobInfo: " + findJob.getJobInfo().toString() +
//             " done_count: " + findJob.getDoneCount());
//         System.out.println("===== 직업 정보 출력 =====");
//
//         assertEquals("직업에 자식 아이디가 동일해야 합니다.", childId, findJob.getId());
//     }
//
//     @Test(expected = NoSuchElementException.class)
//     @Transactional
//     @Rollback(value = false)
//     public void 직업_삭제() throws Exception {
//         //given
//         Long childId = 1L;
//         Job findJob = jobService.findById(childId).get();
//
//         //when
//         jobService.delete(findJob);
//         em.flush();
//         em.clear();
//
//         //then
//         findJob = jobService.findById(childId).get();
//         System.out.println("===== 직업 정보 출력 =====");
//         System.out.println("job_id: " + findJob.getId() +
//             " jobInfo: " + findJob.getJobInfo().toString() +
//             " done_count: " + findJob.getDoneCount());
//         System.out.println("===== 직업 정보 출력 =====");
//
//         fail("직업이 없어야 합니다.");
//     }
// }