import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import axios from "axios";
type Props = {};

const Cadastro = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [ms, setMs] = useState<string>("");
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const regSenha = /^[a-zA-Z0-9]+$/i;
  const nav = useNavigate();
  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setSenha("");

    if (!email || !senha) {
      setMs("Campo vazio");
    }

    if (!regEmail.test(email) || !regSenha.test(senha)) {
      setMsg("Tipo de e-mail ou senha incorreto");
      nav("/cadastro");
    } else {
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
          console.log(res.data);
          if (res.data === true) {
            setMsg("Esse e-mail já existe");
            nav("/cadastro");
          } else {
            nav("/login");
            setEmail("");
            setSenha("");
          }
        });
    }
  };

  return (
    <div className={styles.cadastro}>
      <h1>Cadastro</h1>
      <h3 style={{ color: "#fff", textAlign: "center" }}>{msg}</h3>
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
        <button type="submit">Cadastro</button>
      </form>
    </div>
  );
};

export default Cadastro;
