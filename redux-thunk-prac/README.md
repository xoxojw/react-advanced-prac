# React-thunk
- Redux Toolkit에 포함되어 있는 미들웨어 기능
  - 따라서 따로 yarn add/npm i 등으로 설치할 필요 없음

## Redux Thunk 사용하는 경우
- 주로 비동기 작업 처리할 때 사용
- 서버와의 통신
- 서드파티 API 호출
  - 서드파티 API에서 데이터를 가져오는 등의 비동기 작업 수행
- 조건부 dispatch
  - action을 dispatch할지 말지 결정하기 위한 현재 상태 확인
- 복잡한 흐름제어
  - 여러 action dispatch가 필요하거나, 특정 딜레이 후 액션을 디스패치 하는 등 복잡한 작업을 수행할 때

## thunk 함수 생성 과정
1. thunk 함수 생성 API : createAsyncThunk
- createAsyncThunk는 reduxToolkit 내장 API이다.
- name convention: __thunkName
- thunk에는 2개의 args가 input
  - 1. Action Value
  - 2. Callback function
    - 이 콜백함수에도 2개의 args input
    - (1) payload : thunk 함수가 외부에서 사용되었을 때 넣은 값을 조회
    - (2) thunkAPI : thunk가 제공하는 여러 API 기능들이 담긴 객체를 꺼내쓸 수 있음
2. createSlice > extraReducer에 thunk 등록
3. dispatch (안에 함수)
4. test