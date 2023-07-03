import { configureStore } from "@reduxjs/toolkit";
import counter from "../modules/counter";

// 1. 기존 redux 방식
// const rootReducer = combineReducers({
//   counter,
// });

// const store = createStore(rootReducer);


// 2. redux-toolkit 방식
const store = configureStore(
  {
    // reducer
    reducer: {
      counter,
    }
  }
);

export default store;
