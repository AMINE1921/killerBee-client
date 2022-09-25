import React, { useState, useEffect } from "reactn";
import TableFlex from "../components/Table/TableFlex";
import { getListFrisbee, deleteFrisbee } from "../utils/api/frisbee";
import toastNotif from "../utils/toastNotif";

const Frisbee = () => {
  const [listFrisbees, setListFrisbees] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListFrisbee()
      .then((response) => {
        if (response?.success) {
          setListFrisbees(response?.frisbees);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    deleteFrisbee(id)
      .then((response) => {
        if (response.success) {
          getList();
          toastNotif("L'élément a été supprimé !", "success");
        }
      })
      .catch((error) => {
        toastNotif(error?.data?.message, "error");
      });
  };

  return (
    <div id="Frisbee">
      <TableFlex page="frisbee" data={listFrisbees} deleteItem={deleteItem} />
    </div>
  );
};

export default Frisbee;
