import React, {useEffect, useState} from "reactn";
import TableFlex from "../components/Table/TableFlex";
import { getListIngredient, deleteIngredient } from "../utils/api/ingredient";
import toastNotif from "../utils/toastNotif";

const Ingredients = () => {
  const [listIngredients, setListIngredients] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getListIngredient()
      .then((response) => {
        if (response?.success) {
          setListIngredients(response?.ingredients);
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

  return (
    <div>
      <TableFlex page="ingredients" data={listIngredients} deleteItem={deleteItem} />
    </div>
  );
};

export default Ingredients;
