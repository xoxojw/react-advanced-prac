import React, { useState, useEffect } from "react";
import api from "./axios/api";

const todoListStyle = {
  width: "80%",
  margin: "10px",
  padding: "10px",
  border: "1px solid lightgray",
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}. ${month}. ${day} ${hour}:${minute}`
}

const App = () => {
  
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
    body: "",
    targetId: "",
    titleToModify: "",
    bodyToModify: "",
  })

  // 1. 데이터 조회 (Fetch)
  // 서버와 통신할 때는 비동기적으로
  // 서버의 상태는 내가 제어할 수 없음 요청을 기다려야하기 때문
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await api.get('/todos');
      console.log("data => ", data);
      setTodos(data);
      console.log("todos => ", todos);
    };
    
    fetchTodos();
  }, [])

  // 2. 등록 함수 (Post)
  const postTodos = async () => {
    const newTodo = {
      title: inputValue.title,
      body: inputValue.body,
      createdAt: Date.now(),
    };

    // { data: todoData } 설정해주니까 id가 실시간으로 렌더링되지 않는 문제 해결
    // 이전) await axios.post('http://localhost:4000/todos', newTodo);
    const { data: todoData } =
      await api.post('/todos', newTodo);

    // 실시간으로 렌더링되도록 setTodos에 설정해주기
    setTodos([...todos, todoData])
  };

  // 3. 삭제 함수 (Delete)
  const onDeleteButtonClickHandler = async (id) => {
    api.delete(`/todos/${id}`);
    // 실시간 렌더링
    setTodos(todos.filter((todo) => {
      return todo.id !== id;
    }))
  };

  // 4. 수정 함수 (Patch)
  const onEditButtonClickHandler = async () => {
    const { data: modifyTodoData } =
      await api.patch(`/todos/${inputValue.targetId}`,
        {
          title: inputValue.titleToModify,
          body: inputValue.bodyToModify,
          createdAt: Date.now(),
        }
      )
    
    // 실시간 렌더링
    // 1. todo.id(Number)와 inputValue.targetId(Text)는 데이터 형이 다르므로 일치연산자(===) 말고 동등연산자(==) 사용 or tartgetId를 Number로 바꿔주기
    // modifyTodoData가 객체 형태이기 때문에 return 할 때 spread operator로 해주기
    setTodos(todos.map((todo) => {
      if (todo.id === Number(inputValue.targetId)) {
        return {...todo, ...modifyTodoData}
      } else {
        return todo;
      }
    }))
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // JSON 형식은 id를 보통 자동으로 넣어주기 때문에 여기서 설정해줄 필요 없음
  const onSubmit = (e) => {
    e.preventDefault();
    // button 클릭 시, input에 들어 있는 값(state)를 이용하여 DB에 저장(post 요청)
    postTodos();
    setInputValue({
      title: "",
      body: "",
    });
  };

  return (
    <>
      <div>
        {/* 추가 영역 */}
        <form onSubmit={onSubmit}>
          <input
            name="title"
            value={inputValue.title}
            onChange={onChange}
            type="text"
            placeholder="제목을 입력하세요"
          />
          <input
            name="body"
            value={inputValue.body}
            onChange={onChange}
            type="text"
            placeholder="내용을 입력하세요"
          />
          <button type="submit">추가</button>
        </form>
      </div>
      <div>
        {/* 수정 영역 */}
          <input
            name="targetId"
            type="text"
            placeholder="수정할 todo의 id"
            value={inputValue.targetId}
            onChange={onChange}
          />
          <input
            name="titleToModify"
            type="text"
            placeholder="수정할 제목"
            value={inputValue.titleToModify}
            onChange={onChange}
          />
          <input
            name="bodyToModify"
            type="text"
            placeholder="수정할 내용"
            value={inputValue.bodyToModify}
            onChange={onChange}
          />
          <button onClick={onEditButtonClickHandler}>수정</button>
      </div>
      <div>
        {/* optional chaining */}
        {todos?.map((todo) => (
          <div key={todo.id} style={todoListStyle}>
            <p>{todo.id} : {todo.title}</p>
            <p>{todo.body}</p>
            <p>{formatTime(todo.createdAt)}</p>
            {/* JSON server에 todo.id를 전달하기 위해서는
            onClick(onDeleteButtonClickHandler(todo.id))로 작성하면 함수를 실행해버림
            따라서 아래처럼 onClick 안에서 함수로 한번 감싸줘야함에 유의! */}
            <button onClick={()=>onDeleteButtonClickHandler(todo.id)}>삭제</button>
          </div>
        ))
        }
      </div>
    </>
  );
};

export default App;
