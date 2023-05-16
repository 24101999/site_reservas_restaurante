import { Session } from "inspector";
import styles from "./Home.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
type Props = {};

type ss<T extends string> = T;

const Home = (props: Props) => {
  const [dado, setDado] = useState<string>("");
  const [dia, setDia] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [mesa, setMesa] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const nav = useNavigate();
  useEffect(() => {
    const el: ss<any> = sessionStorage.getItem("dado");
    setDado(el);
    if (!el) {
      nav("/login");
    } else {
      nav("/home");
    }
  }, []);

  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(dia);
    // console.log(hora);
    // console.log(nome);
    // console.log(mesa);
    axios
      .post(
        "http://localhost:1999/admin/insert.php",
        {
          mesa,
          hora,
          nome,
          dia,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === "errotrue") {
          setMsg("data invalida");
        } else {
          setMsg("");
        }
        if (res.data === "oktrue") {
          console.log("valido");
        } else if (res.data) {
          // console.log("tudo certo");
        } else if (!res.data) {
          console.log("erro");
        }
      });
  };

  return (
    <div className={styles.home}>
      <h1>Fassa sua reserva </h1>
      <form onSubmit={sub}>
        <h3>{msg}</h3>
        <label>
          <span>mesa</span>
          <select
            // value={"1"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setMesa(e.target.value)
            }
          >
            <option value="0">selcione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </label>
        <label>
          <span>Dia</span>
          <select
            // value={"segunda"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setDia(e.target.value)
            }
          >
            <option value="">selecione</option>
            <option value="segunda">segunda</option>
            <option value="terça">terça</option>
            <option value="quarta">quarta</option>
            <option value="quinta">quinta</option>
            <option value="sexta">sexta</option>
            <option value="sabado">sabado</option>
            <option value="domingo">domingo</option>
          </select>
        </label>
        <label>
          <span>Hora</span>
          <input
            type="time"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHora(e.target.value)
            }
          />
        </label>
        <label>
          <span>Nome</span>
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
        </label>

        <button type="submit">cadastrar</button>
      </form>
    </div>
  );
};

export default Home;
