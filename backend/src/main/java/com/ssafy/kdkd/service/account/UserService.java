package com.ssafy.kdkd.service.account;

import static com.ssafy.kdkd.domain.entity.account.User.createUser;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.kdkd.domain.dto.account.UserDto;
import com.ssafy.kdkd.domain.entity.account.User;
import com.ssafy.kdkd.repository.account.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void saveUser(UserDto userDto) {
        User userEntity = createUser(userDto);
        userRepository.save(userEntity);
    }

    public void updateUser(UserDto userDto){
        Optional<User> findUserEntity = userRepository.findByEmail(userDto.getEmail());

        User userEntity = findUserEntity.get();

        userEntity.setAccessToken(userDto.getAccessToken());
        userRepository.save(userEntity);
    }

    public boolean isUserExists(String email) {
        return userRepository.existsByEmail(email);
    }

}
