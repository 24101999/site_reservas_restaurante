import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import axios from "axios";
type Props = {};

const Cadastro = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const nav = useNavigate();
  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setSenha("");
    axios
      .post(
        "http://localhost:1999/login/insert.php",
        { email, senha },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data === true) {
          nav("/cadastro");
        } else {
          nav("/login");
        }
      });
  };

  return (
    <div className={styles.cadastro}>
      <h1>Cadastro</h1>
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
        <button type="submit">Cadastro</button>
      </form>
    </div>
  );
};

export default Cadastro;
