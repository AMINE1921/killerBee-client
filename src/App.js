import React, { useGlobal, useEffect, useDispatch } from "reactn";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyLoggedIn, getUserInfos } from "./utils/api/user";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
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
      {isLogged && <NavBar />}
      <div className="containerPage">
        <Routes>
          {!isLogged && <Route path="/" element={<Login />} />}
          {!isLogged && <Route path="/login" element={<Login />} />}
          {isLogged && <Route path="/" element={<Home />} />}
          {isLogged && <Route path="/frisbee" element={<Home />} />}
          {isLogged && <Route path="/ingredients" element={<Home />} />}
          {isLogged && <Route path="/processes" element={<Home />} />}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
