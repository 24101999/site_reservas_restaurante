import React, { ChangeEvent, useState } from "react";
import styles from "./Admin.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Session } from "inspector";
type Props = {};

const Admin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const nav = useNavigate();
  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:1999/login/",
        { email, senha },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (!res.data) {
          nav("/login");
          sessionStorage.setItem("dado", "");
        } else {
          sessionStorage.setItem("dado", res.data);
          nav("/home");
        }
      });
    setEmail("");
    setSenha("");
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={sub}>
        <label>
          <span>E-mail</span>
          <input
            value={email}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            value={senha}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenha(e.target.value)
            }
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link to={"/cadastro"}>Cadastre-se</Link>
    </div>
  );
};

export default Admin;
