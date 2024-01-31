package com.ssafy.kdkd.service.account;

import static com.ssafy.kdkd.domain.entity.account.User.createUser;

import org.springframework.stereotype.Service;

import com.ssafy.kdkd.domain.dto.account.UserDto;
import com.ssafy.kdkd.domain.entity.account.User;
import com.ssafy.kdkd.repository.account.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User saveUser(UserDto userDto) {
        User userEntity = createUser(userDto);
        System.out.println("userEntity : "+userEntity.toString());
        return userRepository.save(userEntity);
    }

}
