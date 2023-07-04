import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // 시간을 설정해두고(ms 단위) 이 시간 안에 응답받지 못하면 오류처리
  timeout: 5000,
});

// request
instance.interceptors.request.use(

  // 요청 보내기 전 수행되는 함수
  function (config) {
    console.log('인터셉터 request 성공!');
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 request 오류!');
    return Promise.reject(error);
   },
)

// response
instance.interceptors.response.use(

  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log('인터셉터 response 응답 성공');
    return response;
  },

  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 response 오류');
    return Promise.reject(error);
   },
)



export default instance;