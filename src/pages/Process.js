import React, { useEffect, useState } from "reactn";
import TableFlex from "../components/Table/TableFlex";
import { getListProcess, deleteProcess } from "../utils/api/process";
import toastNotif from "../utils/toastNotif";

const Process = () => {
  const [listProcesses, setListProcesses] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListProcess()
      .then((response) => {
        if (response?.success) {
          setListProcesses(response?.processes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    deleteProcess(id)
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
    <div>
      <TableFlex page="process" data={listProcesses} deleteItem={deleteItem} />
    </div>
  );
};

export default Process;
