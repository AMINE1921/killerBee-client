import { toast } from "react-toastify";

const toastNotif = (msg, type) => {
  if (type === "error") {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      hideProgressBar: false,
    });
  } else if (type === "success") {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      hideProgressBar: false,
    });
  } else if (type === "info") {
    toast.info(msg, {
      position: "bottom-right",
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      hideProgressBar: false,
    });
  } else {
    return null;
  }
};

export default toastNotif;
