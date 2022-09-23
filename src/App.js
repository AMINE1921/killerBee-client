import React, { useGlobal, useEffect, useDispatch } from "reactn";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyLoggedIn, getUserInfos } from "./utils/api/user";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Frisbee from "./pages/Frisbee";
import Ingredients from "./pages/Ingredients";
import Process from "./pages/Process";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

function App() {
  const [global] = useGlobal();
  const { isLogged } = global;
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    verifyLoggedIn()
      .then((response) => {
        if (response?.success) {
          dispatch?.switchLogged(true);
          getUserInfos(response?.user?.id).then((res) => {
            if (res?.success) {
              const newUser = res.user;
              dispatch?.updateUserInfos(newUser);
            }
          });
        } else {
          dispatch?.switchLogged(false);
        }
      })
      .catch((err) => {
        err && dispatch.switchLogged(false);
      });
  }, [pathname, isLogged]);

  return (
    <div>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        {isLogged && <NavBar />}
        <Layout className={isLogged && "page"}>
          {isLogged && <Header pathname={pathname} />}
          <Routes>
            {!isLogged && <Route path="/" element={<Login />} />}
            {!isLogged && <Route path="/login" element={<Login />} />}
            {isLogged && <Route path={"/"} element={<Home />} />}
            {isLogged && <Route path="/frisbee" element={<Frisbee />} />}
            {isLogged && (
              <Route path="/ingredients" element={<Ingredients />} />
            )}
            {isLogged && <Route path="/process" element={<Process />} />}
            {isLogged && <Route path={"/add"} element={<Add />} />}
            {isLogged && <Route path={"/:id"} element={<Edit />} />}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
