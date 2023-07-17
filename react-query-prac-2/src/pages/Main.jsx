import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addTodo, getTodos } from "../api/todoList";

export default function Main() {
  const navigate = useNavigate();

  // 1. getTodos라는 query function을 실행해서 바로 `data: todos`로 넘겨주는 것이 아니고,
  // 2. getTodos를 실행하면 캐시 context안에 먼저 캐시 데이터를 채워넣은 후에,
  // 3. 캐시 데이터를 `data: todos`에 넘겨주는 것이다.
  // 🔺 위의 순서를 항상 생각하기!
  const { isLoading, isFetching, data: todos } = useQuery(["todos"], getTodos);
  // ✅ isLoading과 isFetching의 차이
  console.log("isLoading, isFetching:", isLoading, isFetching);
  console.log("todos: ", todos); // undefined -> [{}, {}, {}]

  const queryClient = useQueryClient();
  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ content });
  };

  if (isLoading) {
    console.log("Main return Loading");
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {console.log("Main return UI")}
      <h1>투두리스트</h1>
      <Link to={"/empty"}>빈 화면으로 이동</Link>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={handleChange} />
        <button>투두 추가</button>
      </form>
      <ul>
        {todos && todos.map((todo, idx) => (
          <li key={todo.id}>
            <div style={{ width: 300, display: "flex", gap: 20 }}>
              <span>
                {idx}: {todo.content}
              </span>
              <button onClick={() => navigate(`/${todo.id}`)}>상세보기</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
