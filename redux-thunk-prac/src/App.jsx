import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { addNumber, minusNumber } from "./redux/modules/counterSlice"; 
import { __addNumber, __minusNumber } from "./redux/modules/counterSlice";

const App = () => {
  const globalNum = useSelector((state) => state.counter.number);
  const [number, setNumber] = useState(0);

  const dispatch = useDispatch();

  const onClickAddNumberHandler = () => {
    dispatch(__addNumber(+number));
  }

  const onClickMinusNumberHandler = () => {
    dispatch(__minusNumber(+number));
  }
  
  return <>
    <div>{globalNum}</div>
    <input
      type="number"
      onChange={(e)=>{setNumber(e.target.value)}}
    />
    <button
      onClick={onClickAddNumberHandler}>
      더하기
    </button>
    <button
      onClick={onClickMinusNumberHandler}>
      빼기
    </button>
  </>
};

export default App;