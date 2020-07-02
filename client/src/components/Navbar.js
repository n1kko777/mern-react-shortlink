import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import M from "materialize-css/dist/js/materialize.min.js";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const onExitHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  React.useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);

  return (
    <>
      <nav className="blue darken-1">
        <div className="nav-wrapper container">
          <span className="brand-logo">Сократи ссылку</span>

          <a href="/#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Создать</NavLink>
            </li>
            <li>
              <NavLink to="/links">Ссылки</NavLink>
            </li>
            <li>
              <a onClick={onExitHandler} href="/#">
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li>
          <NavLink to="/create">Создать</NavLink>
        </li>
        <li>
          <NavLink to="/links">Ссылки</NavLink>
        </li>
        <li>
          <a onClick={onExitHandler} href="/#">
            Выйти
          </a>
        </li>
      </ul>
    </>
  );
};
