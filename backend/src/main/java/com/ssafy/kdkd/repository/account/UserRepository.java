package com.ssafy.kdkd.repository.account;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.kdkd.domain.entity.account.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);


}
