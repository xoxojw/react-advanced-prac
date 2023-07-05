# 📡 JSON, axios/fetch
> JSON, 비동기 통신 - axios(3rd party), fetch(JS 기본api)

<br />

## 요약
- JSON : Mockup server, fake server
  - 전체 프로젝트를 테스트하려면 FE, BE 모두 개발이 완료 되어야 함
  - BE가 개발완료 되기 전 FE를 테스트하기 위한 목업 서버를 설정

- Axios
  - 브라우저, node.js 환경을 위해 Promise API를 활용하는 HTTP 비동기통신 라이브러리
  - fetch와 다르게 자동으로 JSON 데이터 형식으로 파싱
  - 요청을 취소할 수도 있고, 타임아웃을 걸 수도 있음
  - HTTP 요청을 가로챌 수 있음 (인터셉터)

- Fetch
  - 네트워크 요청을 위한 JS 기본 내장 메서드
  - fetch도 axios와 마찬가지로 promise 기반의 HTTP 클라이언트
    - 클라이언트를 이용해 네트워크 요청을 하면, 이행(resolve) 혹은 거부(reject)할 수 있는 promise가 반환된다는 뜻

<br />

## 세팅

```
yarn add axios
yarn json-server
```

```
yarn json-server --watch db파일명.json --port 0000
```

> 서버는 아예 별개의 물리적 공간에 있다고 생각하며 공부할 것!

<br />

## status
> <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Status" target="_blank">HTTP 상태 코드 | MDN</a>
- `1xx` (Information responses) : 요청을 받았으며 프로세스를 계속 진행
- `2xx` (Successful responses) : 요청을 성공적으로 받았으며 인식했고 수용함
- `3xx` (Redirection) : 요청 완료를 위해 추가 작업 조치 필요
- `4xx` (Client error) : 요청의 문법이 잘못됐거나 요청을 처리할 수 없음
- `5xx` (Server error) : 서버가 명백히 유효한 요청에 대한 충족을 실패

<br />

## axios 기초
```
// json

{
  "todos": [
    {
      "id": 1,
      "title": "react 1",
      "body": "todo body 1"
    },
    {
      "id": 2,
      "title": "react 2",
      "body": "todo body 2"
    },
    {
      "id": 3,
      "title": "react 3",
      "body": "todo body 3"
    },
    {
      "id": 4,
      "title": "react 4",
      "body": "todo body 4"
    },
    {
      "id": 5,
      "title": "react 5",
      "body": "todo body 5"
    }
  ]
}
```
```
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);

  // 서버와 통신할 때는 비동기적으로
  // 서버의 상태는 내가 제어할 수 없음 요청을 기다려야하기 때문
  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:4000/todos')
    console.log("data => ", data);
    setTodos(data);
    console.log("todos => ", todos);
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <>
      {/* optional chaining */}
      {todos?.map((todo) => (
        <div key={todo.id}>
          {todo.id} : {todo.title}
        </div>
      ))
      }
    </>
  );
};

export default App;
```