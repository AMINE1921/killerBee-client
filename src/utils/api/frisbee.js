import axiosConfig from "./axios";

export const createFrisbee = async (dataValues) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.post(
    `/frisbees`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};

export const getListFrisbee = async () => {
  const response = await axiosConfig.get(`/frisbees`, {});
  const data = await response.data;
  return data;
};

export const getFrisbeeById = async (id) => {
  const response = await axiosConfig.get(`/frisbees/${id}`, {});
  const data = await response.data;
  return data;
};

export const deleteFrisbee = async (id) => {
  const response = await axiosConfig.delete(`/frisbees/${id}`, {});
  const data = await response.data;
  return data;
};

export const updateFrisbee = async (dataValues, id) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.put(
    `/frisbees/${id}`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};
