package com.ssafy.kdkd.controller;

import com.ssafy.kdkd.domain.dto.account.*;
import com.ssafy.kdkd.domain.entity.account.Profile;
import com.ssafy.kdkd.service.account.ProfileService;
import com.ssafy.kdkd.service.account.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


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
	public ResponseEntity<?> signUp(UserDto userDto){
		if(userService.signUp(userDto)==1) {
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}else{
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/login")
	@Operation(summary = "계정 로그인")
	public ResponseEntity<?> userLogin(UserLoginDto userLoginDto){
		if(userService.userLogin(userLoginDto).getUserId()!=null) {
			return new ResponseEntity<UserLoginDto>(HttpStatus.OK);
		}else{
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
	}

	@GetMapping("/profile/selectAll")
	@Operation(summary = "프로필 모두 가져오기")
	public ResponseEntity<?> profileSelectAll(ProfileSelectAllDto profileSelectAllDto){
		List<ProfileSelectAllDto> returnDto = profileService.profileSelectAll(profileSelectAllDto);
		return new ResponseEntity<List<?>>(returnDto,HttpStatus.OK);
	}


	@PostMapping("/profile/login")
	@Operation(summary = "프로필 로그인")
	public ResponseEntity<?> profileLogin(ProfileLoginDto profileLoginDto){
		ProfileLoginDto returnDto = profileService.profileLogin(profileLoginDto);
		return new ResponseEntity<ProfileLoginDto>(returnDto,HttpStatus.OK);
	}

	@PostMapping("/profile/create")
	@Operation(summary = "프로필 생성")
	public ResponseEntity<?> profileCreate(ProfileDto profileDto){
		int create = profileService.profileCreate(profileDto);
		if(create==1) {
			return new ResponseEntity<>(HttpStatus.OK);
		}else{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/profile/update")
	@Operation(summary = "프로필 수정")
	public ResponseEntity<?> profileUpdate(ProfileUpdateDto profileUpdateDto){
		profileService.profileUpdate(profileUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/profile/delete")
	@Operation(summary = "프로필 삭제")
	public ResponseEntity<?> profileDelete(ProfileDeleteDto profileDeleteDto){
		profileService.profileDelete(profileDeleteDto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/profile/childlist")
	@Operation(summary = "내 자식 목록 가져오기")
	public ResponseEntity<?> getChildList(GetChildListDto getChildListDto){
		List<GetChildListDto> childProfile = profileService.getChildList(getChildListDto);
		return new ResponseEntity<List<?>>(childProfile,HttpStatus.OK);
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
