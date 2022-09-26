import React, { useEffect, useState } from "reactn";
import { isEmpty } from "lodash";
import TableFlex from "../components/Table/TableFlex";
import HeaderTable from "../components/Table/HeaderTable";
import { getListIngredient, deleteIngredient } from "../utils/api/ingredient";
import toastNotif from "../utils/toastNotif";

const Ingredients = () => {
  const [listIngredientsOriginal, setListIngredientsOriginal] = useState([]);
  const [listIngredients, setListIngredients] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListIngredient()
      .then((response) => {
        if (response?.success) {
          setListIngredients(response?.ingredients);
          setListIngredientsOriginal(response?.ingredients);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (id) => {
    deleteIngredient(id)
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
      ? setListIngredients(
          listIngredients.filter((el) => {
            return el?.name?.startsWith(value);
          })
        )
      : setListIngredients(listIngredientsOriginal);
  };

  return (
    <div>
      <HeaderTable onChangeSearch={(v) => onSearch(v)} type="ingredients" />
      <TableFlex
        page="ingredients"
        data={listIngredients}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default Ingredients;
