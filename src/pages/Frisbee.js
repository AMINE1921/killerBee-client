import React, { useState, useEffect } from "reactn";
import { isEmpty } from "lodash";
import TableFlex from "../components/Table/TableFlex";
import HeaderTable from "../components/Table/HeaderTable";
import { getListFrisbee, deleteFrisbee } from "../utils/api/frisbee";
import toastNotif from "../utils/toastNotif";

const Frisbee = () => {
  const [listFrisbeesOriginal, setListFrisbeesOriginal] = useState([]);
  const [listFrisbees, setListFrisbees] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListFrisbee()
      .then((response) => {
        if (response?.success) {
          setListFrisbees(response?.frisbees);
          setListFrisbeesOriginal(response?.frisbees);
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

  const onSearch = (value) => {
    !isEmpty(value)
      ? setListFrisbees(
          listFrisbees.filter((el) => {
            return el?.name?.startsWith(value);
          })
        )
      : setListFrisbees(listFrisbeesOriginal);
  };

  return (
    <div id="Frisbee">
      <HeaderTable onChangeSearch={(v) => onSearch(v)} type="frisbee" />
      <TableFlex page="frisbee" data={listFrisbees} deleteItem={deleteItem} />
    </div>
  );
};

export default Frisbee;
