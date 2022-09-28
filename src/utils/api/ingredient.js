import axiosConfig from "./axios";

export const createIngredient = async (dataValues) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.post(
    `/ingredients`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};

export const getListIngredient = async () => {
  const response = await axiosConfig.get(`/ingredients`, {});
  const data = await response.data;
  return data;
};

export const getIngredientById = async (id) => {
  const response = await axiosConfig.get(`/ingredients/${id}`, {});
  const data = await response.data;
  return data;
};

export const deleteIngredient = async (id) => {
  const response = await axiosConfig.delete(`/ingredients/${id}`, {});
  const data = await response.data;
  return data;
};

export const updateIngredient = async (dataValues, id) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.put(
    `/ingredients/${id}`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};
