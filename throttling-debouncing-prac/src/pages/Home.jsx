import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let timerId = null;
  const navigate = useNavigate();

  // 쓰로틀링 버튼을 누르고 -> 페이지 이동을 하면
  // 이전 페이지에서 실행한 쓰로틀링 로직이 페이지 이동 후에도 여전히 유효해서 실행됨 -> 메모리 누수!!!!!!!!!!
  // 이를 방지하기 위해 useEffect를 사용하여 아래의 로직도 함께 구현
  useEffect(() => {
    return () => {
      // 언마운트 시
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  // 이벤트를 일정 주기마다 발생시키는 것
  const throttle = (delay) => {
    if (timerId) {
      // timerId가 있으면 바로 함수 종료
      return;
    }
    console.log(`API 요청 실행! ${delay / 1000}초 동안 추가 요청은 안받습니다!`);
    timerId = setTimeout(() => {
      console.log(`${delay / 1000}초 지남 추가요청 받습니다!`);
      timerId = null;
    }, delay);
  };

  // 반복적인 이벤트 이후, delay가 지나면 함수 호출
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay / 1000}초 지났으므로 API 요청 실행!`);
      timerId = null;
    }, delay);
  };
  
  return (
    <>
      <div style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        <h1>Button 이벤트 예제</h1>
        <button onClick={() => throttle(2000)}>쓰로틀링 버튼</button>
        <button onClick={() => debounce(2000)}>디바운싱 버튼</button>
        <button onClick={() => navigate('/company')}>페이지 이동</button>
      </div>
    </>
  );
};

export default Home;
