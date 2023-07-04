import React, { useState } from 'react';
import { validatePassword } from '../lib/helpers/passwordValidation';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validatePassword(password, confirmPassword);

    if (validation.valid) {
      // 비밀번호가 유효하면 회원가입 절차 진행
    } else {
      // 유효하지 않은 경우 메시지 표시
      setMessage(validation.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
      <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
      {message && <p>{message}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
