import React, { useState, useDispatch, useEffect } from "reactn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaseball, faCubesStacked, faIndustry, faRightFromBracket, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Menu, Layout } from "antd";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import logoKillerBee from "../../assets/img/KillerBee_logoWhite.png";
import { logOutUser } from "../../utils/api/user";

const NavBar = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemSelected, setItemSelected] = useState(["home"]);
  const { pathname } = useLocation();
  const items = [
    {
      key: "home",
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: "Accueil",
    },
    {
      key: "frisbee",
      icon: <FontAwesomeIcon icon={faBaseball} />,
      label: "Frisbee",
    },
    {
      key: "ingredients",
      icon: <FontAwesomeIcon icon={faCubesStacked} />,
      label: "Ingrédients",
    },
    {
      key: "process",
      icon: <FontAwesomeIcon icon={faIndustry} />,
      label: "Procédés",
    },
    {
      key: "logout",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      label: "Se déconnecter",
    },
  ];

  useEffect(() => {
    matchPath("/", pathname)
      ? setItemSelected(["home"])
      : matchPath("/frisbee", pathname)
      ? setItemSelected(["frisbee"])
      : matchPath("/ingredients", pathname)
      ? setItemSelected(["ingredients"])
      : matchPath("/process", pathname)
      ? setItemSelected(["process"])
      : setItemSelected([]);
  }, [pathname]);

  const onSelectItem = (item) => {
    setItemSelected(item?.selectedKeys);
    if (item?.key === "logout") {
      logOut();
    } else if (item?.key === "home") {
      navigate(`/`);
    } else {
      navigate(`/${item?.key}`);
    }
  };

  const logOut = () => {
    logOutUser()
      .then((response) => {
        if (response.success) {
          dispatch.switchLogged(false);
          dispatch.resetUserInfos();
          navigate(`/`);
        }
      })
      .catch((err) => {
        if (err) {
          dispatch.switchLogged(false);
          dispatch.resetUserInfos();
        }
      });
  };

  return (
    <Sider id="NavBar" breakpoint="lg" collapsedWidth="0" width={250}>
      <div className="logo">
        <img className="logoPic" src={logoKillerBee} alt="Logo killerBee" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={itemSelected}
        selectedKeys={itemSelected}
        items={items}
        onSelect={onSelectItem}
      />
    </Sider>
  );
};

export default NavBar;
