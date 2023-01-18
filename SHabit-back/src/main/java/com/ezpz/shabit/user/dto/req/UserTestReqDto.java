package com.ezpz.shabit.user.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class UserTestReqDto {

	@Getter
	@Setter
	@ToString
	public static class SignUp {

		@NotEmpty(message = "이메일은 필수 입력값입니다.")
		@Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
		@Schema(description = "이메일", example = "ssafy123@gmail.com")
		private String email;

		@NotEmpty(message = "닉네임은 필수 입력값입니다.")
		@Pattern(regexp = "[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}", message = "닉네임 형식에 맞지 않습니다.")
		@Schema(description = "닉네임", example = "ssafy")
		private String nickname;

		private int theme = 0;

		@NotEmpty(message = "비밀번호는 필수 입력값입니다.")
		@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
		@Schema(description = "비밀번호", example = "ssafy!1234")
		private String password;
	}

	@Getter
	@Setter
	@ToString
	public static class Login {

		@NotEmpty(message = "이메일은 필수 입력값입니다.")
		@Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
		@Schema(description = "이메일", example = "ssafy123@gmail.com")
		private String email;

		@NotEmpty(message = "비밀번호는 필수 입력값입니다.")
		@Schema(description = "비밀번호", example = "ssafy!1234")
		private String password;

		public UsernamePasswordAuthenticationToken toAuthentication() {
			return new UsernamePasswordAuthenticationToken(email, password);
		}
	}

	@Getter
	@Setter
	public static class Logout {
		@NotEmpty(message = "잘못된 요청입니다.")
		@Schema(description = "액세스 토큰", example = "ey...")
		private String accessToken;

		@NotEmpty(message = "잘못된 요청입니다.")
		@Schema(description = "리프레쉬 토큰", example = "ey...")
		private String refreshToken;
	}
}
