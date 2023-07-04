import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk 함수
// - 주로 서버와의 통신을 위해 사용 (비동기적 작업)
// - thunk 함수에는 2개의 input 존재
// (1) 이름(=action value) : 큰 의미X // (2) 콜백함수
export const __addNumber = createAsyncThunk(
  "ADD_NUMBER_WAIT",
  (payload, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(payload));
    }, 2000);
  }
);

export const __minusNumber = createAsyncThunk(
  "MINUS_NUMBER_WAIT",
  (payload, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(minusNumber(payload));
    }, 2000);
  }
);

const initialState = {
  number: 0,
};


// 비동기 작업이 필요 없다면 redux toolkit으로 그냥 바로 실행하면 됨!
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },
    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  }
});

export default counterSlice.reducer;
export const {addNumber, minusNumber} = counterSlice.actions;