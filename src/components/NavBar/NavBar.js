import React, { useState, useDispatch, useEffect } from "reactn";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import logoKillerBee from "../../assets/img/KillerBee_logoWhite.png";
import { logOutUser } from "../../utils/api/user";
import { isEmpty } from "lodash";

const NavBar = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemSelected, setItemSelected] = useState();
  const { pathname } = useLocation();
  const items = [
    {
      key: "home",
      icon: <AppstoreOutlined />,
      label: "Accueil",
    },
    {
      key: "frisbee",
      icon: <MailOutlined />,
      label: "Frisbee",
    },
    {
      key: "ingredients",
      icon: <MailOutlined />,
      label: "Ingrédients",
    },
    {
      key: "process",
      icon: <SettingOutlined />,
      label: "Procédés",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
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
      : matchPath("/process", pathname) && setItemSelected(["process"]);
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
        defaultSelectedKeys={!isEmpty(itemSelected) ? itemSelected : ["home"]}
        selectedKeys={itemSelected}
        items={items}
        onSelect={onSelectItem}
      />
    </Sider>
  );
};

export default NavBar;
