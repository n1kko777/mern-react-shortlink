import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  React.useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const { request } = useHttp();
  const [link, setLink] = React.useState("");

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2 mt-40 ">
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            onKeyPress={pressHandler}
            onChange={(e) => setLink(e.target.value)}
            value={link}
            id="link"
            type="text"
            className="validate"
          />
          <label htmlFor="link">Ссылка</label>
        </div>
      </div>
    </div>
  );
};
