import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

// 서버와의 통신(비동기 작업) 하는 thunk 함수 예시
export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:4000/todos');
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      // console.log('fulfilled : ', action)
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      // console.log('rejected : ', action)
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { } = todosSlice.actions;
export default todosSlice.reducer;