# 공부할 내용
1. thunk 함수 구현
2. reducer 로직 구현 : 기존 reducers -> extraReducers
  - 서버 통신: request/response 성공이 100% 보장되어 있지 않음
    - AS-IS redux state: todos, counter, user ...
    - TO-BE redux state: isLoading, isError, data
      - isLoading: 화면에 '로딩 중'임을 띄워서 사용자가 로딩 중인 것을 알 수 있게끔
3. 기능 확인 : Network + devTools
4. Store 값 조회 + 화면 렌더링
  1. Store에 dispatch
    - toolkit API: fulfillWithValue, rejectWithValue
      - fullfillWithValue : Promise 객체가 resolve(=네트워크 요청 성공) 됐을 때 dispatch 해주는 기능을 가진 API
      - rejectWithValue : Promise 객체 통신이 실패했을 때 그 에러 값을 dispatch 해주는 API
      - thunk 함수에서 fulfillWithValue, rejectWithValue 쓰면 -> dispatch를 통해 extraReducer로 넘어감
    - dispatch? : reducer에게 action과 payload를 전달해줘서 state를 업데이트 하는 과정
  2. Rendering
    - 컴포넌트에서 렌더링 해 줄 때, isLoading/error/todos(반환값) 세 가지의 경우를 모두 핸들링
    - isLoading, error에서 걸리면 컴포넌트에서 원래 보여주고자 했던 내용(여기서는 todo의 리스트들)까지 내려가지 않아 todos가 undefined, null 상태로 렌더링되지 않도록 핸들링해줄 수 있음

5. reducer vs extraReducer?
  - reducers 는 액션함수를 생성함과 동시에 해당 액션함수에 대응하는 역할
  - extraReducers 는 사용자가 slice reducer 내에서 액션함수에 접근할 수 있게하지만, extraReducers 내에서 액션함수를 생성하지 않는다는 점이 기존의 reducers 프로퍼티와의 가장 큰 차이점