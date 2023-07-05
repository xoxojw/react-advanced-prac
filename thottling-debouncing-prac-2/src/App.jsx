import React, { useState, useCallback } from "react";
import _ from "lodash";

const App = () => {
  // yarn add lodash

  const [searchText, setSearchText] = useState('');
  const [inputText, setInputText] = useState('');

  // debouncing
  // ✅ debounce 함수를 useCallback으로 감싸서 memoization을 해주어야 함!
  const handleSearchText = useCallback(
    _.debounce((text) => {
      setSearchText(text);
    }, 1000),
    []
  );

  // 공통함수
  const handleChange = (e) => {
    setInputText(e.target.value);
    handleSearchText(e.target.value);
  }

  return (
    <>
      <div style={{
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
        <h1>디바운싱 예제 - Lodash</h1>
        <input
          onChange={handleChange}
          type="text"
          placeholder="입력값을 넣고 디바운싱 테스트를 해보세요."
          style={{
            width: '300px',
            padding: '5px',
            margin: '10px',
          }}
        />
        <p>Search Text : {searchText}</p>
        <p>Input Text : {inputText}</p>
      </div>
    </>
  );
};

export default App;