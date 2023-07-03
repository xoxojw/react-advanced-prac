import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNumber, minusNumber } from "./redux/modules/counter"; 

const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("number ->" + number)
  }, [number])

  return <>
    <div>현재 카운트 : {counter.number}</div>
    <button
      onClick={() => { dispatch(addNumber(1)); }}>
      +1
    </button>
    <button
      onClick={() => { dispatch(minusNumber(1)); }}>
      -1
    </button>
  </>
};

export default App;