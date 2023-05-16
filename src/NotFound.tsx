import React from "react";
import { useNavigate } from "react-router-dom";
type Props = {};

const NotFound = (props: Props) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Essa pagina não existe</h1>
      <button onClick={() => nav("/login")}>Login</button>
    </div>
  );
};

export default NotFound;
