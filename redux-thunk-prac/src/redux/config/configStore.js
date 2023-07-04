import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../modules/counterSlice";

const store = configureStore(
  {
    reducer: {
      counter: counterSlice,
    }
  }
);

export default store;