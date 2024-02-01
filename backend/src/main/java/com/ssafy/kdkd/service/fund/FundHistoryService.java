package com.ssafy.kdkd.service.fund;

import com.ssafy.kdkd.domain.entity.fund.FundHistory;
import com.ssafy.kdkd.repository.fund.FundHistoryRepository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FundHistoryService {

    private final FundHistoryRepository fundHistoryRepository;
    private final EntityManager em;

    public void save(FundHistory fundHistory) {
        fundHistoryRepository.save(fundHistory);
    }

    /**
     * 자식의 투자내역 목록 조회
     * 
     * @param childId 자식 아이디
     * @return 자식의 투자 내역(리스트)
     */
    public List<FundHistory> findFundHistoryByChildId(Long childId) {
        return fundHistoryRepository.findFundHistoryByChildId(childId);
    }

    /**
     * 자식의 투자내역 목록 전체 삭제
     * 
     * @param childId 자식 아이디
     */
    @Modifying
    @Transactional
    public void deleteAllByChildId(Long childId) {
        em.createQuery("DELETE FROM FundHistory fh WHERE fh.child.id = :childId")
            .setParameter("childId", childId)
            .executeUpdate();
    }

}
