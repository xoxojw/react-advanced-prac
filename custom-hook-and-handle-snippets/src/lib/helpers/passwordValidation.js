export const validatePassword = (password, confirmPassword) => {
  // 1. 8자리 이상
  if (password.length < 8) {
    return {
      valid: false,
      message: "비밀번호는 8자리 이상으로 입력해주세요!",
    };
  }

  // 2. 비밀번호에는 영문 대,소문자 중 하나 && 특수문자 하나를 필수로 포함
  const upperCaseLetters = /[A-Z]/g;
  const lowerCaseLetters = /[a-z]/g;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
  if(!(password.match(upperCaseLetters) || password.match(lowerCaseLetters)) || !password.match(specialCharacters)) {
    return {
      valid: false,
      message: "비밀번호는 영문 대/소문자 한 글자와, 특수문자 한 글자를 포함하여 입력해야 합니다.",
    };
  }

  // 3. 비밀번호 입력, 비밀번호 입력 확인이 일치해야 함
  if (password !== confirmPassword) {
    return {
      valid: false,
      message: "비밀번호 입력과 입력 확인이 일치하지 않습니다.",
    };
  }

  return {
    valid: true,
    message: "Password valid",
  };
};
