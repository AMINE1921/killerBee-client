import React, { useEffect, useState } from "reactn";
import { isEmpty } from "lodash";
import TableFlex from "../components/Table/TableFlex";
import HeaderTable from "../components/Table/HeaderTable";
import { getListProcess, deleteProcess } from "../utils/api/process";
import toastNotif from "../utils/toastNotif";

const Process = () => {
  const [listProcessesOriginal, setListProcessesOriginal] = useState([]);
  const [listProcesses, setListProcesses] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListProcess()
      .then((response) => {
        if (response?.success) {
          setListProcesses(response?.processes);
          setListProcessesOriginal(response?.processes);
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

  const onSearch = (value) => {
    !isEmpty(value)
      ? setListProcesses(
          listProcesses.filter((el) => {
            return el?.name?.startsWith(value);
          })
        )
      : setListProcesses(listProcessesOriginal);
  };

  return (
    <div>
      <HeaderTable onChangeSearch={(v) => onSearch(v)} type="process" />
      <TableFlex page="process" data={listProcesses} deleteItem={deleteItem} />
    </div>
  );
};

export default Process;
