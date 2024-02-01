package com.ssafy.kdkd.controller;

import com.ssafy.kdkd.domain.dto.account.*;
import com.ssafy.kdkd.service.account.ProfileService;
import com.ssafy.kdkd.service.account.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//feat/BE-profile로 브랜치명을 변경하였습니다.
@RestController
@RequestMapping("/users")
public class ProfileController {
	@Autowired
	private	UserService userService;

	@Autowired
	private ProfileService profileService;

	@PostMapping("/signup")
	@Operation(summary = "회원가입")
	public String signUp(@RequestBody UserDto userDto){
		return userService.signUp(userDto);
	}
	@PostMapping("/login")
	@Operation(summary = "계정 로그인")
	public UserLoginDto userLogin(@RequestBody UserLoginDto userLoginDto){
		return userService.userLogin(userLoginDto); //user_id값 반환, 값이 0이면 로그인 실패, 값이 1이상이면 로그인 성공
	}
	@GetMapping("/profile/selectAll")
	@Operation(summary = "프로필 모두 가져오기")
	public List<ProfileSelectAllDto> profileSelectAll(ProfileSelectAllDto profileSelectAllDto){
		List<ProfileSelectAllDto> returnDto = profileService.profileSelectAll(profileSelectAllDto);
		return returnDto;
	}

	@PostMapping("/profile/login")
	@Operation(summary = "프로필 로그인")
	public ProfileLoginDto profileLogin(ProfileLoginDto profileLoginDto){
		System.out.println("Controller 들어감");
		ProfileLoginDto returnDto = profileService.profileLogin(profileLoginDto);
		System.out.println("Controller 나옴");
		return returnDto;
	}


	@PostMapping("/profile/create")
	@Operation(summary = "프로필 생성")
	public String profileCreate(@RequestBody ProfileDto profileDto){
		profileService.profileCreate(profileDto);
		return "프로필이 생성되었습니다.";
	}

	@PutMapping("/profile/update")
	@Operation(summary = "프로필 수정")
	public String profileUpdate(ProfileUpdateDto profileUpdateDto){
		System.out.println("Controller 들어옴");
		profileService.profileUpdate(profileUpdateDto);
		System.out.println("Controller 나감");
		return "프로필이 업데이트되었습니다.";
	}

	@DeleteMapping("/profile/delete")
	@Operation(summary = "프로필 삭제")
	public String profileDelete(ProfileDeleteDto profileDeleteDto){
		profileService.profileDelete(profileDeleteDto);
		return "프로필이 삭제되었습니다.";
	}

//	@GetMapping("/profile/getchild/{nickname}")
//	@Operation(summary = "내 자식 접근")
//	public String getChild(@PathVariable String nickname){
//		profileService.
//
//
//		return "나의 자식 : " + nickname + "에게 접근하였습니다.";
//	}

}
