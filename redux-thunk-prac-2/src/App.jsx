import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "./redux/modules/todosSlice";

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
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}. ${month}. ${day} ${hour}:${minute}`
}

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector(state => {
    return state.todos;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, []);

  if (isLoading) {

    return <div><h1>로딩 중</h1></div>;

  } else if (error) {

    return <div>{error.message}</div>;

  } else {
    return (
      <>
        {[...todos].sort((a, b) => (b.createdAt - a.createdAt)).map(todo => {
          return (
            <div key={todo.id} style={todoListStyle}>
              <h4>{todo.title}</h4>
              <p>{todo.body}</p>
              <p>{formatTime(todo.createdAt)}</p>              
            </div>
          )
        })}
      </>
    )};
};

export default App;
