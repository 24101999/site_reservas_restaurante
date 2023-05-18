import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Voltar = () => {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      nav("/home");
    }, 1000);
  }, []);

  return (
    <div>
      <h1 style={{ color: "#fff" }}>mesa vazia</h1>
    </div>
  );
};

export default Voltar;
