# Redux Toolkit

`yarn add react-redux @reduxjs/toolkit`

> react-redux와 함께 redux 대신 reduxjs/toolkit 설치해주면 됨

## 🔪 moduleSlice.js
- slice api를 사용하면 `Action Value`, `Action Creator`, `Reducer`가 한 큐에 끝!

```
// counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = { counter: 0, showCounter: true };

// createSlice는 객체를 인자로서 생성
createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // state.counter = state.counter + action.amount;
      // payload는 rtk가 기본값으로 사용하는 필드명이므로 지켜서 사용
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  }
});

export default counterSlice.reducer;
export const { increment, decrement, increase, toggleCounter } = counterSlice.actions;
// export const counterActions = counterSlice.actions;
```

```
// counter.jsx
...
import { counterActions } from "../modules/counter";

const Counter = () => {
  const dispatch = useDispatch();
  
  ...
  
  // 기존 dispatch 실행방식
  const increaseHandler = () => {
    dispatch({ type: 'increase', amount: 10 });
  };

  // export CounterSlice.Actions 통한 방식
    const increaseHandler = () => {
    dispatch(counterActions.increase(10));
    // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };

  ...
};

export default Counter;
```

- **immer**
  - Redux에서 상태를 변경할 때는 `불변성`을 유지해야 한다.
  - 각 reducer들 안의 함수를 보면,
  `state.counter++`나 `state.counter = state.counter + action.amount`의 경우 상태를 직접 수정하는 것처럼 보이지만, 실제로는 새로운 상태를 유지하며 상태를 변화시킴


<br />

## ⚙️ configStore.js
- configureStore는 createStore처럼 store를 만든다
- 차이가 있다면, 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다는 것
  - 기존 redux : `rootReducer`, `combineReducers`, `createStore`, `export default store` 따로따로
  - rtk : `configureStore`, `export default store` - 끝!

```
import { configureStore } from "@reduxjs/toolkit";
import counter from "../modules/counter";

// 1. 기존 redux 방식
// const rootReducer = combineReducers({
//   auth,
//   comments: comments,
//   contents: contents,
//   myprofile: myProfileReducer,
// });

// const store = createStore(rootReducer);

// export default store;


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
```

- configureStore 안에는 객체가 들어가고, 이 객체는 설정 객체이며 여기서 리듀서 프로퍼티를 정함
- 설정 객체에 들어가는 reducer property는 `reducers`가 아님! - 1개의 `reducer`
- configureStore에서는 리듀서의 값이 단일 리듀서가 될 수 있음