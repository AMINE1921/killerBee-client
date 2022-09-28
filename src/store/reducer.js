import { addReducer, setGlobal } from "reactn";

addReducer("switchLogged", (global, dispatch, logged) => {
  setGlobal({ isLogged: logged });
});

addReducer("updateUserInfos", (global, dispatch, newUser) => {
  localStorage.setItem("userInfos", JSON.stringify(newUser));
  setGlobal({ user: newUser });
});

addReducer("resetUserInfos", (global, dispatch) => {
  const newUser = {
    id: "",
    firstname: "",
    lastname: "",
    mail: "",
    roles: ["operator"],
  };
  localStorage.setItem("userInfos", JSON.stringify(newUser));
  setGlobal({ user: newUser });
});
