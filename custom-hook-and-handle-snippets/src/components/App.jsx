// import React, { useState } from "react";
import useInput from "../hooks/useInput";
import SignUp from "./SignUp";

const App = () => {

  // 1. custom hook 사용
  const [name, onChangeNameHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  // 2. 기존 방식
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  // const onChangeNameHandler = (e) => {
  //   setName(e.target.value);
  //  }
  // const onChangePasswordHandler = (e) => {
  //   setPassword(e.target.value);
  // }


  return (
    <>
      <h1>Custom Hooks</h1>
      <input type="text" value={name} onChange={onChangeNameHandler} />
      <input type="password" value={password} onChange={onChangePasswordHandler}/>
      <div>
        <SignUp />
      </div>
    </>
  );
};

export default App;
