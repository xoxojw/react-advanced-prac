import { createSlice } from "@reduxjs/toolkit";

// 1. 기존 redux 방식

// // Action Value
// const PLUS_ONE = "counter/PLUS_ONE";
// const MINUS_ONE = "counter/MINUS_ONE";

// // Action Creator
// export const plusOne = () => {
//   return {
//     type: PLUS_ONE,
//   }
// }
// export const minusOne = () => {
//   return {
//     type: MINUS_ONE,
//   }
// }

// Initial State
const initialState = {
  number: 0,
};

// // Reducer
// const counter = (state = initialState, action) => {
//   switch (action.type) {
//     case PLUS_ONE:
//       return {
//         number: state.number + 1,
//       };
//     case MINUS_ONE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// };


// -----------------------------------------------
// 2. redux-toolkit 방식

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
