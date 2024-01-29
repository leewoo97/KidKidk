package com.ssafy.kdkd.repository.child;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.kdkd.domain.entity.user.Child;
import com.ssafy.kdkd.repository.ChildRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChildService {

    private final ChildRepository childRepository;


    public Optional<Child> findChild(Long id) {
        return childRepository.findById(id);
    }

}
