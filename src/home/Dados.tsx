import React, { useEffect, useState } from "react";
import styles from "./dados.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
type Props = {};

interface d {
  id?: number;
  nome?: string;
  dia?: string;
  hora?: number;
}

const Dados = (props: Props) => {
  const [dados, setDados] = useState<Array<d>>();
  const param = useParams();

  const id = param.id;
  useEffect(() => {
    axios
      .get(`https://henriquedeveloper.com.br/admin/dado.php?id=${id}`)
      .then((res) => {
        setDados(res.data);
      });
  }, []);

  return (
    <div className={styles.dados}>
      ;
      {dados
        ? dados.map((d) => {
            return (
              <div key={d.id} className={styles.dado}>
                <h1 style={{ textAlign: "center", color: "#fff" }}>
                  Mesa {id}
                </h1>
                <div className="">
                  <h3>Nome</h3>
                  <p>{d.nome}</p>
                </div>
                <div className="">
                  <h3>Hora</h3>
                  <p>{d.hora}</p>
                </div>
                <div className="">
                  <h3>dia</h3>
                  <p>{d.dia}</p>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Dados;
