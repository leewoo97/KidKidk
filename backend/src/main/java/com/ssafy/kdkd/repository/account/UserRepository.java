package com.ssafy.kdkd.repository.account;

import com.ssafy.kdkd.domain.entity.account.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	//이미 존재하는 엑세스토큰,이메일인지 확인하는 쿼리
	@Query("SELECT CASE WHEN COUNT(u)>0 THEN true ELSE false END FROM User u WHERE u.accessToken = :access_token AND u.email = :email")
	boolean existsByUser(@Param("access_token") String access_token, @Param("email") String email);

	@Query("SELECT u.id FROM User u WHERE u.accessToken = :access_token")
	Long findByAccessToken(@Param("access_token") String access_token);
}
