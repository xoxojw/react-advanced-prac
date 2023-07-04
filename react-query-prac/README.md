
```
yarn add react-query
```

<br />

```
// App.jsx

import React from "react";
import Router from "./shared/Router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
    );
};

export default App;
```

<br />

```
// lib > api > todos.js

// todos와 관련한 api를 관리하는 모듈
import axios from "axios";

// 조회
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`)
  return response.data;
};

// 추가
const addTodo = async () => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
}

export { getTodos, addTodo };
```

<br />

```
// redux > components > TodoList.jsx

import React from "react";
// import { useSelector } from "react-redux";
import { StyledDiv, StyledTodoListHeader, StyledTodoListBox } from "./styles";
import Todo from "../Todo";
import { getTodos } from "../../../lib/api/todos";
import { useQuery } from "react-query";

/**
 * 컴포넌트 개요 : 메인 > TODOLIST. 할 일의 목록을 가지고 있는 컴포넌트
 * 2022.12.16 : 최초 작성
 *
 * @returns TodoList 컴포넌트
 */
function TodoList({ isActive }) {
  // const todos = useSelector((state) => state.todos);

  // react query
  // isLoading, error를 알아서 인식해줌..!!!!!!!!! OMG!!
  const { isLoading, error, data } = useQuery("todos", getTodos);

  if (isLoading) {
    return <h1>로딩 중 입니다!!!</h1>
  } else if (error) {
    return <h1>오류가 발생하였습니다....!</h1>
  }

  return (
    <StyledDiv>
      <StyledTodoListHeader>
        {isActive ? "해야 할 일 ⛱" : "완료한 일 ✅"}
      </StyledTodoListHeader>
      <StyledTodoListBox>
        {data
          .filter((item) => item.isDone === !isActive)
          .map((item) => {
            return <Todo key={item.id} todo={item} isActive={isActive} />;
          })}
      </StyledTodoListBox>
    </StyledDiv>
  );
}

export default TodoList;
```

<br />

```
// redux > components > Input > Input.jsx
...
// import { addTodo } from "../../modules/todos";
import { addTodo } from "../../../lib/api/todos";

  // react-query 관련 코드
  // 1. Query : 데이터에 대한 요청
  // App.jsx에서 const queryClient = new QueryClient(); 해줬기 때문에 하위에서는 useQueryClient로 호출
  const queryClient = useQueryClient();
  // 2. Mutation : 데이터 변경
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // onSuccess가 일어나면 기존의 Query인 todos는 무효화
      // 새로운 데이터를 가져와서 "todos"를 최신화 시킴
      queryClient.invalidateQueries("todos")
      console.log('성공하였습니다!!')
    }
    
    ...

      // 추가하려는 todo를 newTodo라는 객체로 새로 만듦
    const newTodo = {
      title,
      contents,
      isDone: false,
      id: uuidv4(),
    };

    // todo를 추가하는 reducer 호출
    // 인자 : payload
    // dispatch(addTodo(newTodo));

    // 위에 dispatch 대신에 mutation으로 데이터 추가
    mutation.mutate(newTodo);
  })
```

<br />