import React, { useGlobal, useState, useEffect } from "reactn";
import { matchPath, useLocation } from "react-router-dom";
import { Avatar } from "antd";
import { isMobile } from "react-device-detect";
import { isEmpty } from "lodash";

const Header = ({ pathname }) => {
  const { state } = useLocation();
  const [global] = useGlobal();
  const { user } = global;
  const [title, setTitle] = useState("");

  useEffect(() => {
    matchPath("/", pathname)
      ? setTitle("Accueil")
      : matchPath("/frisbee", pathname)
      ? setTitle("Gestion des frisbee")
      : matchPath("/ingredients", pathname)
      ? setTitle("Gestion des ingrédients")
      : matchPath("/process", pathname)
      ? setTitle("Gestion des procédés")
      : matchPath("/add", pathname)
      ? setTitle(
          `Ajouter un ${
            !isEmpty(state) && state?.type === "frisbee"
              ? "Frisbee"
              : state?.type === "ingredient"
              ? "Ingrédient"
              : state?.type === "process"
              ? "Procédé"
              : "Frisbee"
          }`
        )
      : setTitle(
        `Modification - ${
          !isEmpty(state) && state?.type === "frisbee"
            ? "Frisbee"
            : state?.type === "ingredient"
            ? "Ingrédient"
            : state?.type === "process"
            ? "Procédé"
            : "Frisbee"
        }`
      );
  }, [pathname, state]);

  return (
    <div id="Header">
      <div className="title">{title}</div>
      {!isMobile && (
        <div className="profileAvatar">
          <span className="name">
            {user?.firstname} {user?.lastname}
          </span>
          <Avatar
            style={{
              backgroundColor: "#2f3640",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {user?.firstname?.substring(0, 1).toUpperCase() +
              user?.lastname?.substring(0, 1)?.toUpperCase()}
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default Header;
