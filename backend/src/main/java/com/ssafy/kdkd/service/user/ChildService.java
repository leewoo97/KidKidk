package com.ssafy.kdkd.service.user;

import com.ssafy.kdkd.domain.dto.account.ChildDto;
import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.user.ChildRepository;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ChildService {

    @Autowired
    private final ChildRepository childRepository;

    public Optional<Child> findChild(Long id) {
        return childRepository.findById(id);
    }

    @Transactional
    public void childUpdate(ChildDto childDto) {
        Long childId = childDto.getChildId();
        int coin = childDto.getCoin();
        int fundMoney = childDto.getFundMoney();

        childRepository.childUpdate(childId, coin, fundMoney);
    }
}
