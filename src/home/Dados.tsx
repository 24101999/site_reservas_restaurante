import { useEffect, useState } from "react";
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
      .get(`https://henriquedeveloper.com.br/back/admin/dado.php?id=${id}`)
      .then((res) => {
        setDados(res.data);
      });
  }, [id]);

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

                <p>
                  Nome: <strong>{d.nome}</strong>
                </p>
                <p>
                  Hora: <strong>{d.hora}</strong>
                </p>
                <p>
                  Dia: <strong>{d.dia}</strong>
                </p>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Dados;
