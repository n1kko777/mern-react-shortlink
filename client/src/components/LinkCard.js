import React, { useCallback, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";

export const LinkCard = ({ link }) => {
  const history = useHistory();
  const { loading, setLoading } = useHttp();
  const { token } = useContext(AuthContext);
  const linkId = useParams().id;

  const onLinkDelete = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        await fetch(`/api/link/${linkId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoading(false);
        history.push("/links");
      } catch (error) {}
    },
    [token, linkId, history, setLoading]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Ссылка</h2>

      <p>
        Ваша ссылка:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>

      <p>
        Откуда:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>

      <p>
        Колличество кликов по ссылке: <strong>{link.clicks}</strong>
      </p>

      <p>
        Дата создания:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
      <p>
        <button onClick={onLinkDelete} className="btn red darken-4">
          Удалить
        </button>
      </p>
    </div>
  );
};
