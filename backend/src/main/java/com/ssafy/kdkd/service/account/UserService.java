package com.ssafy.kdkd.service.account;

import com.ssafy.kdkd.domain.dto.account.UserLoginDto;
import com.ssafy.kdkd.domain.dto.account.UserDto;
import com.ssafy.kdkd.domain.entity.account.User;
import com.ssafy.kdkd.repository.account.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
	@Autowired
	UserRepository userRepository;

	public String signUp(UserDto userDto) {
		if(userRepository.existsByUser(userDto.getAccessToken(),userDto.getEmail())){
			return "이미 가입한 계정이 존재합니다.";
		}else{
			User temp = new User(userDto);
			userRepository.save(temp);
			return "회원가입이 완료되었습니다.";
		}
	}

	public UserLoginDto userLogin(UserLoginDto userLoginDto){
		Long user_id = userRepository.findByAccessToken(userLoginDto.getAccessToken());
		UserLoginDto temp = new UserLoginDto(user_id);
		return temp;
	}
}
