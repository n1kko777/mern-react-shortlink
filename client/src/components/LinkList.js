import React from "react";
import { NavLink } from "react-router-dom";

export const LinkList = ({ links }) => {
  if (links.length === 0) {
    return <p style={{ textAlign: "center" }}>Список пуст</p>;
  }

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          <th>Ваша ссылка</th>
          <th>Откуда</th>
          <th>Клики</th>
          <th>&nbsp;</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link) => (
          <tr key={link._id}>
            <td>{link.to}</td>
            <td>{link.from}</td>
            <td>{link.clicks}</td>
            <td>
              <NavLink to={`/detail/${link._id}`}>Подробнее</NavLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
