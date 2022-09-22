import React, { useDispatch, useGlobal } from "reactn";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import toastNotif from "../utils/toastNotif";
import { loginUser } from "../utils/api/user";
import logoKillerBee from "../assets/img/KillerBee_logoBallon.png";

const Login = () => {
  const [global] = useGlobal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    loginUser(values)
      .then((response) => {
        if (response) {
          dispatch.switchLogged(true);
          navigate("/");
          toastNotif("Conexion avec succès", "success");
        }
      })
      .catch((error) => {
        error?.data?.error === "Wrong login or password"
          ? toastNotif("Adresse mail ou mot de passe incorrect !", "error")
          : toastNotif(error?.data?.message, "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    if (
      isEmpty(errorInfo?.values?.mail) &&
      isEmpty(errorInfo?.values?.password)
    ) {
      toastNotif("Veuillez remplir tous les champs", "error");
    } else if (isEmpty(errorInfo?.values?.mail)) {
      toastNotif("Veuillez indiquer une adresse mail", "error");
    } else if (isEmpty(errorInfo?.values?.password)) {
      toastNotif("Veuillez indiquer un mot de passe", "error");
    }
  };

  return (
    <div id="loginPage">
      <Form
        className="loginForm"
        name="basic"
        labelCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="logo">
          <img className="logoPic" src={logoKillerBee} alt="Logo killerBee" />
          <span className="logoText">KillerBee</span>
        </div>
        <div className="titleConnect">SE CONNECTER</div>
        <Form.Item
          name="mail"
          label="MAIL"
          rules={[
            {
              type: "email",
              required: true,
              message: "Veuillez indiquer une adresse mail valide !",
            },
          ]}
        >
          <Input type="email" placeholder="toto@killerbee.fr" />
        </Form.Item>

        <Form.Item
          label="MOT DE PASSE"
          name="password"
          rules={[
            {
              required: true,
              message: "Veuillez indiquer votre mot de passe !",
            },
          ]}
        >
          <Input.Password placeholder="Toto986&" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button htmlType="submit" type="primary" shape="round" size="large">
            Connexion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
