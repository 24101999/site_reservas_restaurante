import styles from "./Home.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
type Props = {};

type ss<T extends string> = T;

const Home = (props: Props) => {
  const [dadoUnico, setDadoUnico] = useState<string>("");
  const [dia, setDia] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [mesa, setMesa] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const regEx = /^[a-z à-ú À-Ú]+$/i;
  const lkn = useNavigate();
  const el: ss<any> = sessionStorage.getItem("dado");
  useEffect(() => {
    if (!el) {
      lkn("/login");
    } else {
      lkn("/home");
    }
  }, [el, lkn]);

  const sub = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!regEx.test(nome)) {
      setMsg("nome incorreto");
      return;
    }
    axios
      .post(
        "https://henriquedeveloper.com.br/back/admin/insert.php",
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
        // console.log(res.data);
        if (!dia || !nome || !hora || !mesa) {
          alert("Há campos vazios");
        }
        if (res.data === "errotrue") {
          setMsg("Horario não permitido");
        } else {
          setMsg("");
        }
        if (res.data === "oktrue" || res.data === "okdtrue") {
          alert("Reservado com sucesso!");
          setHora("");
          setMesa("");
          setDia("");
          setNome("");
        } else if (res.data) {
          // console.log("tudo certo");
        } else if (!res.data) {
          setMsg("Esse horário já está reservado!");
        } else {
          setMsg("");
        }
      });
  };

  const gerar = () => {
    // e.preventDefault();
    axios.get("https://henriquedeveloper.com.br/back/admin/gerar.php");
    alert("dado gerado");
  };

  return (
    <div className={styles.home}>
      <button className={styles.btGerar} onClick={gerar}>
        gerear dados no banco
      </button>
      {/* <form
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
        onSubmit={gerar}
      >
      </form> */}

      <h1>Fassa sua reserva </h1>
      <h3>{msg}</h3>
      <div className={styles.reservas}>
        <h2>verificar reservas</h2>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setDadoUnico(e.target.value)
          }
        >
          <option value="0">selecione</option>
          <option value="1">mesa 1</option>
          <option value="2">mesa 2</option>
          <option value="3">mesa 3</option>
          <option value="4">mesa 4</option>
          <option value="5">mesa 5</option>
          <option value="6">mesa 6</option>
          <option value="7">mesa 7</option>
          <option value="8">mesa 8</option>
          <option value="9">mesa 9</option>
          <option value="10">mesa 10</option>
          <option value="11">mesa 11</option>
          <option value="12">mesa 12</option>
          <option value="13">mesa 13</option>
          <option value="14">mesa 14</option>
          <option value="15">mesa 15</option>
        </select>
        <button onClick={() => lkn(`/dado/${dadoUnico}`)}>ver mesa</button>
      </div>
      <form onSubmit={sub}>
        <label>
          <span>mesa</span>
          <select
            value={mesa}
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
            value={dia}
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
            value={hora}
            type="time"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHora(e.target.value)
            }
          />
        </label>
        <label>
          <span>Nome</span>
          <input
            value={nome}
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
