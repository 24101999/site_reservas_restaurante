import React, { ChangeEvent, useState } from "react";
import styles from "./Admin.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Session } from "inspector";
import { setgid } from "process";
type Props = {};

const Admin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [ms, setMs] = useState<string>("");
  const nav = useNavigate();
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const regSenha = /^[a-zA-Z0-9]+$/i;

  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !senha) {
      setMs("Campo vazio");
    }
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
        if (!regEmail.test(email) && !regSenha.test(senha)) {
          nav("/login");
          sessionStorage.setItem("dado", "");
        }

        if (!res.data) {
          setMsg("E-mail ou senha invalido");
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
      <h3>{msg}</h3>

      <form onSubmit={sub}>
        <label>
          <span>E-mail</span>
          <input
            value={email}
            placeholder={ms}
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
            placeholder={ms}
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
