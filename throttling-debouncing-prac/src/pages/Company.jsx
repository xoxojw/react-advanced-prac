import React from "react";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Company Page</h1>
      <button onClick={() => navigate('/')}>홈으로 이동</button>
    </>);
};

export default Company;
