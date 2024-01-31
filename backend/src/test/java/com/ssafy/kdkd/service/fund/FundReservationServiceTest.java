package com.ssafy.kdkd.service.fund;

import static com.ssafy.kdkd.domain.entity.fund.FundReservation.createFundReservation;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import com.ssafy.kdkd.domain.dto.fund.FundReservationDto;
import com.ssafy.kdkd.domain.entity.fund.FundReservation;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.service.user.ChildService;

import jakarta.persistence.EntityManager;

import java.util.NoSuchElementException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(readOnly = true)
public class FundReservationServiceTest {

    @Autowired FundReservationService fundReservationService;
    @Autowired ChildService childService;
    @Autowired EntityManager em;

    @Test
    @Transactional
    @Rollback(value = false)
    public void 투자예약_생성() throws Exception {
        //given
        Long childId = 1L;
        Child child = childService.findChild(childId).get();

        //when
        int yield = (int) Math.floor(Math.random() * 10);
        FundReservationDto fundReservationDto = new FundReservationDto("test fund reservation", "test content", yield, true, childId);
        FundReservation fundReservation = createFundReservation(fundReservationDto);
        fundReservation.setChild(child);
        fundReservationService.save(fundReservation);
        em.flush();
        em.clear();

        //then
        FundReservation findFundReservation = fundReservationService.findById(childId).get();

        System.out.println("===== 투자예약 정보 출력 =====");
        System.out.println("fund_id: " + findFundReservation.getId() +
            " name: " + findFundReservation.getName() +
            " content: " + findFundReservation.getContent() +
            " yield: " + findFundReservation.getYield() +
            " state: " + findFundReservation.isState());
        System.out.println("===== 투자예약 정보 출력 =====");

        assertEquals("투자예약에 자식 아이디가 동일해야 합니다.", childId, findFundReservation.getId());
    }

    @Test
    public void 투자예약_조회() throws Exception {
        //given
        Long childId = 1L;

        //when
        FundReservation findFundReservation = fundReservationService.findById(childId).get();

        //then
        System.out.println("===== 투자예약 정보 출력 =====");
        System.out.println("fund_id: " + findFundReservation.getId() +
            " name: " + findFundReservation.getName() +
            " content: " + findFundReservation.getContent() +
            " yield: " + findFundReservation.getYield() +
            " state: " + findFundReservation.isState());
        System.out.println("===== 투자예약 정보 출력 =====");

        assertEquals("투자예약에 자식 아이디가 동일해야 합니다.", childId, findFundReservation.getId());
    }

    @Test
    @Transactional
    @Rollback(value = false)
    public void 투자예약_수정() throws Exception {
        //given
        Long childId = 1L;
        FundReservation existingFundReservation = fundReservationService.findById(childId).get();

        //when
        FundReservationDto fundReservationDto = new FundReservationDto(
            existingFundReservation.getName(), "새로운 투자예약", existingFundReservation.getYield(), false,
            existingFundReservation.getId()
        );
        existingFundReservation.updateFundReservation(fundReservationDto);
        em.flush();
        em.clear();

        //then
        FundReservation findModifiedFundReservation = fundReservationService.findById(childId).get();
        System.out.println("===== 투자예약 정보 출력 =====");
        System.out.println("fund_id: " + findModifiedFundReservation.getId() +
            " name: " + findModifiedFundReservation.getName() +
            " content: " + findModifiedFundReservation.getContent() +
            " yield: " + findModifiedFundReservation.getYield() +
            " state: " + findModifiedFundReservation.isState() +
            " child_id: " + findModifiedFundReservation.getChild().getId());
        System.out.println("===== 투자예약 정보 출력 =====");

        assertEquals("투자예약에 자식 아이디가 동일해야 합니다.", childId, findModifiedFundReservation.getChild().getId());
    }

    @Test(expected = NoSuchElementException.class)
    @Transactional
    @Rollback(value = false)
    public void 투자예약_삭제() throws Exception {
        //given
        Long childId = 1L;
        FundReservation findFundReservation = fundReservationService.findById(childId).get();

        //when
        if (!findFundReservation.isState()) {
            fundReservationService.delete(findFundReservation);
        }
        em.flush();
        em.clear();

        //then
        findFundReservation = fundReservationService.findById(childId).get();

        fail("투자예약이 없어야 합니다.");
    }
}