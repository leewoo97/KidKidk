package com.ssafy.kdkd.service.account;

import com.ssafy.kdkd.domain.dto.account.*;
import com.ssafy.kdkd.domain.entity.account.Profile;
import com.ssafy.kdkd.domain.entity.account.User;
import com.ssafy.kdkd.repository.account.ProfileRepository;
import com.ssafy.kdkd.repository.account.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
	@Autowired
	ProfileRepository profileRepository;

	@Autowired
	UserRepository userRepository;

	public int profileCreate(ProfileDto profileDto){
		Optional<User> userOptional = userRepository.findById(profileDto.getUserId());
		if (userOptional.isPresent()) { // Optional에서 User 객체를 꺼내기 전에 존재 여부를 확인하는 것이 좋습니다.
			User user = userOptional.get(); // Optional에서 User 객체를 꺼냅니다.
			Profile profile = new Profile(profileDto, user);
			profileRepository.save(profile);
			return 1; //프로필이 생성되면 1을 반환
		} else {
			// 프로필이 생성되지않으면 0을 반환
			return 0;
		}
	}

	public List<ProfileSelectAllDto> profileSelectAll(ProfileSelectAllDto profileSelectAllDto){
		Long user_id = profileSelectAllDto.getUserId();
		List<ProfileSelectAllDto> returnDto = profileRepository.profileSelectAllDto(user_id);
		return returnDto;
	}

	public ProfileLoginDto profileLogin(ProfileLoginDto profileLoginDto){
		System.out.println("Service 들어감");
		Long profile_id = profileLoginDto.getProfileId();
		int pin  = profileLoginDto.getPin();
		ProfileLoginDto returnDto = profileRepository.profileLoginDto(profile_id, pin);
		System.out.println("Service 나옴");
		return returnDto;
	}

	@Transactional
	public void profileUpdate(ProfileUpdateDto profileUpdateDto){
		System.out.println("Service 들어옴");
		Long profileId = profileUpdateDto.getProfileId();
		String nickname = null;
		int pin = 0;
		String profileImage = null;

		Optional<Profile> updateProfile = profileRepository.findById(profileId);
		if (updateProfile.isPresent()) {
			Profile profile = updateProfile.get();
			nickname = profile.getNickname();
			pin = profile.getPin();
			profileImage = profile.getProfileImage();
		}else{

		}

		String updateNickname = profileUpdateDto.getNickname();
		int updatePin = profileUpdateDto.getPin();
		String updateProfileImage = profileUpdateDto.getProfileImage();

		if(updateNickname != null){
			nickname = updateNickname;
		}
		if(updatePin == 0){
			pin = updatePin;
		}
		if(updateProfileImage != null){
			profileImage = updateProfileImage;
		}

		profileRepository.profileUpdate(profileId,nickname,pin,profileImage);

		System.out.println("Service 나감");
	}

	@Transactional
	public void profileDelete(ProfileDeleteDto profileDeleteDto){
		Long profileId = profileDeleteDto.getProfileId();
		profileRepository.profileDelete(profileId);
	}


}
