# react-advanced-practice
> Practice Redux Toolkit, JSON, HTTP, axios/fetch, Thunk, Custom Hooks, React Query

---


# 🔐 인증, 인가(쿠키, 세션, 토큰, JWT)

## 1. 인증(Authentication)과 인가(Authorization)


<div align="center">
  <img src="https://github.com/xoxojw/react-advanced-practice/assets/124491335/c1dcdf3a-132f-408c-83c5-5796f6a6611a" width="80%" />
</div>


### 📍 인증 Authentication
- 서비스를 이용하려는 유저가 `등록된 회원`인지 확인하는 절차
- 쉽게 생각해서 `로그인`하는 것
- 보안 프로세스의 첫 번째 단계
 
### 📍 인가 Authorization (권한 부여)
- 인증이 완료된 사용자에게 `특정 리소스나 기능에 접근할 수 있는 권한`을 부여하는 것
- 예시) 서버에서 특정 파일을 다운받는 권한, 관리자 권한으로 앱에 액세스 할 수 있는 권한 등
 
### 📍 http 프로토콜 통신의 특징 2가지

<br />

<div align="center">
  <img src="https://github.com/xoxojw/react-advanced-practice/assets/124491335/4c9f7a99-56e4-4dc1-b6a6-029aff8e7d66" width="80%" />
</div>

<br />

- **무상태(Stateless)**

  - 서버는 클라이언트의 상태를 기억하지 않는다.
  - 따라서 클라이언트는 각 요청마다 서버에서 요구하는 모든 상태 정보를 담아서 요청해야 한다.
  - `동일한 서버를 여러개로 확장시킬 수 있게 해주는 특성 (Scale-out)`

<br />

<div align="center">
  <img src="https://github.com/xoxojw/react-advanced-practice/assets/124491335/2400ab24-3823-45e3-948c-a259fc00442f" width="80%" />
</div>

<br />

- **비연결성(Connectionless)**
  - 서버와 클라이언트는 연결되어 있지 않다.
  - 서버 입장에서는 클라이언트의 요청은 매번 새로운 요청임
  - `최소한의 서버 자원으로 서버를 유지할 수 있게 해주는 특성`
  - 단, 채팅 등 각 사용자별 요청이 잦은 서비스의 경우처럼 연결성을 유지해야 하는 경우도 있음

<br />
<br />

## 2. 쿠키, 세션, 토큰

### 📍 쿠키
> 브라우저가 주머니에 가지고 있는 텍스트 파일 형태의 쿠키라고 접근! key-value 형태
- 무상태와 비연결성이라는 http 통신의 특징에도 불구하고 마치 서버가 클라이언트의 인증 상태를 기억하는 것처럼 구현할 수 있는 수단
- 쿠키는 별도로 삭제처리 하거나, 유효기간이 만료하지 않는 이상 서버와 통신할 때 자동으로 주고 받게 됨
- 서버에 특정 API 요청을 한 뒤에, 서버가 response하면 `header`안에 `set-cookie`속성으로 쿠키 정보를 담아주고, 브라우저는 이 쿠키를 `자동으로` 저장
- 서버에 http를 요청할 때마다 브라우저에 저장되어 있는 쿠키는 `자동으로` 서버에 전송됨
- 단, `동일한 Origin` 또는 `CORS(Cross Origin Resource Sharing)를 허용하는 Origin`에만 쿠키를 보냄

  - `Origin` : 출처를 뜻함 =  `protocol + host + port`
    - React App은 localhost port 3000, JSON server는 localhost port 4000에서 돌아가고 있다면 둘은 다른 Origin을 갖고 있는 것!

  - `CORS` : Cross Origin Resource Sharing의 약자로, `다른 출처에 리소스 요청하는 것을 허용하는 정책`
    - 브라우저는 기본적으로 `SOP(Same Origin Policy)`를 원칙으로 하고 있음
    - 하지만 서버와 클라이언트가 각각 CORS 설정을 통해 상호합의된 웹사이트는 예외적으로 서로 다른 출처임에도 API 요청이 가능
      - 서버 측 `credentials` / 클라이언트 측 `withCredential`
      - React-App(port 3000), JSON-server(port 4000)의 경우에도 각각 CORS를 설정해주어야 API 요청이 가능

<br />

### 📍 세션
> 서버와 사용자의 연결이 active한 상태, 인증(쉽게 말해서 login)이 유지되고 있는 상태
- 인증(Authentication)시 세션 인증
  - 인증(쉽게 말해서 로그인/회원가입) 성공 시 서버에서 쿠키에 `sessionId`를 담아 전달
  - 서버에서 관리하는 세션 저장소에 회원 데이터가 있으면 세션 유지, 없으면 세션 만료
 
- 인가(Authorization)시 세션 인증
  - 서버는 권한 부여가 필요한 API 요청을 받으면 클라이언트 쿠키에 들어 있는 `sessionId`를 세션 저장소에서 조회
  - `sessionId`가 확인되면 DB에서 데이터를 조회하여 response함

<br />

### 📍 토큰
> `클라이언트에서 보관`하는 암호화된 인증 정보
> > 세션은 `서버`에서 보관!
- 세션처럼 서버에서 사용자의 인증 정보를 보관할 필요가 없어서 `서버 부담을 줄여주는 인증 수단`으로 볼 수 있음
- Web에서 인증 수단으로 사용되는 토큰은 주로 `JWT(Json Web Token)`이다.

  - `JWT`의 특징
 
    - 온점을 기준으로 `header.payload.signature` 세 가지 데이터를 포함하는 형식을 갖는다.
    - 국제 인터넷 표준 인증 규격 중 하나이다.
    - 암호화된 토큰을 누구나 복호화하여 `payload`를 볼 수 있음 -> 토큰의 용도는 *`인증정보(payload)`에 대한 보호가 아니라* `위조 방지`에 있음!!
    - `정보(payload)`를 토큰화 할 때 signature에 secret key가 필요하며, secret key는 복호화키가 아니고 `토큰의 유효성을 검증`하는데 사용됨
    - <a href="https://jwt.io/">jwt.io 공식 사이트</a>

<br />

---

<div align="center">
  <img src="https://github.com/xoxojw/react-advanced-practice/assets/124491335/5661e200-62d0-4b84-a219-7672b8da1a83" width="80%" />
</div>

<br />
