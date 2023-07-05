# 디바운싱, 쓰로틀링

<br />

## 🔲디바운싱
### 용어의 어원
- `Bouncing`
  - 전자(electronic)에서 기계적인 접점을 가지는 스위치에서 나타나는 현상에서 가져온 개념
  - `바운싱 현상`이란 접점이 붙거나 떨어지는 짧은 순간에 접점이 고속으로 여러번 on/off 되는 현상을 뜻함 (전자회로 생각하면 될듯..?)

- 이러한 바운싱 현상을 방지하기 위한 것이 `디바운싱 기법`
### 개념
- 연이어 발생한 이벤트를 하나의 그룹으로 묶어서 처리하는 방식
- 주로 그룹에서 처음이나 마지막으로 실행된 함수를 처리하는 방식으로 사용
- 짧은 시간에 연속해서 이벤트가 발생하면 이벤트 핸들러를 호출하지 않다가, 마지막 이벤트로부터 일정한 시간(delay)이 경과한 후에 한 번만 호출하도록 할 때 사용
- 사용 예시 : `입력값 실시간 검색`, `화면 resize 이벤트` 등

  <br />

```
let timerId = null;

// 반복적인 이벤트 이후, delay가 지나면 함수 호출
const debounce = (delay) => {
  if (timerId) {
    // 할당되어 있는 timerId에 해당하는 타이머 제거
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    console.log(`마지막 요청으로부터 ${delay / 1000}초 지났으므로 API 요청 실행!`);
    timerId = null;
  }, delay);
};
```


  <br />
  <br />

## ⌛쓰로틀링
### 용어의 어원
- `throttle` : 목을 조르다, 목을 졸라 죽이다 (...😱!!)
- 기계공학에서 통로의 면적을 변화시켜(목을 조르듯 줄이고 늘리고..?😱😱) 흐르는 유체를 제어하는 것을 의미

### 개념
- 출력을 조절한다 = 이벤트를 일정 주기마다 발생하도록 하는 것
- 예를 들어, 설정 시간을 100ms로 주면, 해당 이벤트는 100ms 동안 최대 한 번만 발생
  - 즉, 마지막 함수가 호출된 후 일정 시간이 지나기 전 다시 호출되지 않도록 함
- 사용 예시 : `무한 스크롤`
  - <a href="https://velog.io/@hyeon930/%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0-Throttling" target="_blank">무한 스크롤 만들기 | @hyeon930님 velog</a>
  - <a href="https://velog.io/@otterp/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0" target="_blank">리액트에서 무한 스크롤 구현하기 | @otterp님 velog</a>

  <br />

```
let timerId = null;

// 이벤트를 일정 주기마다 발생시키는 것
const throttle = (delay) => {
  if (timerId) {
    // timerId가 있으면 바로 함수 종료
    return;
  }
  console.log(`API 요청 실행! ${delay / 1000}초 동안 추가 요청은 안받습니다!`);
  timerId = setTimeout(() => {
    console.log(`${delay / 1000}초 지남 추가요청 받습니다!`);
    timerId = null;
  }, delay);
};
```