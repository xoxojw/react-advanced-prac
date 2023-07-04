# 🛴 Custom Hook 정리
## 1. 너무나도 궁금했던 내용... 드디어!
- 저번 뉴스피드 프로젝트 할 때 계속해서 사용하는 함수들을 반복하는게 비효율적이라고 느꼈었음
- ex. 반복되는 input, onChange, onSubmit... 그 외에도 switch문으로 return해줬던 firebase auth 에러메시지 등

<br />

## 2. 사용 방법
1. hooks 폴더 아래에 useHookName.js 파일 생성
2. useState, useEffect 등을 사용하는 custom hook 로직 생성
  - state, handler
3. export 해준 뒤 필요한 곳에서 import하여 사용

<br />

## 3. 장점
1. 코드의 반복 사용을 줄여주기 때문에 코드가 훨씬 간결해짐
2. 가독성, 유지보수성 차원에서도 good!