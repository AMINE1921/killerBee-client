import { setGlobal } from "reactn";

const resetValues = {
  isLogged: false,
  user: localStorage?.getItem("userInfos")
    ? JSON.parse(localStorage.getItem("userInfos") || "{}")
    : null
};

setGlobal(resetValues);
