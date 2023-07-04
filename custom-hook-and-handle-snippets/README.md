# 🛴 1. Custom Hook
## 1) 너무나도 궁금했던 내용... 드디어!
- 저번 뉴스피드 프로젝트 할 때 계속해서 사용하는 함수들을 반복하는게 비효율적이라고 느꼈었음
- ex. 반복되는 input, onChange, onSubmit... 그 외에도 switch문으로 return해줬던 firebase auth 에러메시지 등

<br />

## 2) 사용 방법
- hooks 폴더 아래에 useHookName.js 파일 생성
- useState, useEffect 등을 사용하는 custom hook 로직 생성
  - state, handler 두 가지 정의
-  export 해준 뒤 필요한 곳에서 import하여 사용

<br />

## 3) 장점
1. 코드의 반복 사용을 줄여주기 때문에 코드가 훨씬 간결해짐
2. 가독성, 유지보수성 차원에서도 good!

<br />
<br />

---

# 🤔 2. 반복사용되는 일반 함수 모듈 분류하는 컨벤션
- custom hook은 useState, useEffect, useRef 같은 친구들을 포함할 때 custom hook으로 만들어주면 좋다는 것은 이해 ㅇㅋ
- 궁금했던 것은, 이전 프로젝트 때 생각했던 게 `날짜 형식 변환`, `비밀번호 유효성 검사`같은 기능들은 여러 번 사용되는 로직인데 이건 어떻게 핸들링할까?

<br />

## ❣️ The answer is - 함수 모듈!
- 예를 들어 `timestamp` 데이터를 우리가 보기 쉽게 변환하려면 formatTime.js snippet 모듈 js파일 생성

```
// formatTime.js
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}. ${month}. ${day} ${hour}:${minute}`
};

export default formatTime;
```

```
// ContentsList.jsx
import React from 'react';
import formatTime from './formatTime';

const ContentsList = () => {

  // ...

  return (
    <>
      ...
      {*/ 여기서 todo.createdAt은 timestamp 형식/*}
      "글 쓴 시간" : {formatTime(todo.createdAt)}
    </>
  );
}

export default ContentsList;
```

<br />

## snippet 분류, 폴더명 컨벤션

```
📦src
 ┣ 📂hooks
 ┃ ┗ 📜useInput.js
 ┣ 📂lib
 ┃ ┣ 📂helpers
 ┃ ┃ ┗ 📜passwordValidation.js
 ┃ ┃ ┗ 📜formatTime.js
 ┃ ┣ 📂services
 ┃ ┗ 📂utils
 ┣ 📜App.jsx
 ┗ 📜index.js
```

1. `lib`: 라이브러리 함수나 공통 로직을 보관하는 폴더로, 일반적으로는 프로젝트 전체에서 사용되는 코드를 모아두는 곳
2. `utils` or `helpers`: 재사용 가능한 함수, 유틸리티 함수, 헬퍼 함수 등
- utils와 helpers는 비슷한 역할이나 차이점이 있음
  - `/utils` is a place where you can place small snippets you can use throughout the application. Small functions to build bigger things with.
  - `/helpers` is more of a place where you store code architectural snippets in my view. Things essential for bootstrapping components and developer ergonomics.

<br />

  |                     | Helper Functions/Classes | Utility Functions/Classes |
  |---------------------|--------------------------|---------------------------|
  | Purpose             | Provide support or aid to other parts of the program | Perform common or generic operations that are not tied to any specific part of the program |
  | Scope               | Typically used within a specific module or part of the program | Can be used throughout the program or in multiple programs |
  | Dependencies        | Often depend on other parts of the program or external libraries | Usually independent of other parts of the program |
  | Examples            | Form validation functions, data formatting classes | String manipulation functions, math libraries |

<br />

3. `services`: API 호출이나 데이터베이스 연결 등 서비스 관련