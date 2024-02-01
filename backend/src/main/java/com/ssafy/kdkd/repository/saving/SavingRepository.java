package com.ssafy.kdkd.repository.saving;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.kdkd.domain.entity.saving.Saving;

public interface SavingRepository extends JpaRepository<Saving, Long> {
}
