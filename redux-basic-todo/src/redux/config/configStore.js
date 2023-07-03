import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todos";

// 🤍기존 redux
// import { createStore } from "redux";
// import { combineReducers } from "redux";
// // 1. create rootReducer with reducers
// const rootReducer = combineReducers({
//   todos,
// });

// // 2. create store
// const store = createStore(rootReducer);

// 3. export
// export default store;


// 💜redux-toolkit
const store = configureStore({
  reducer: {
    todos,
  }
});

export default store;
