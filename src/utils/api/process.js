import axiosConfig from "./axios";

export const createProcess = async (dataValues) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.post(
    `/processes`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};

export const getListProcess = async () => {
  const response = await axiosConfig.get(`/processes`, {});
  const data = await response.data;
  return data;
};

export const getProcessById = async (id) => {
  const response = await axiosConfig.get(`/processes/${id}`, {});
  const data = await response.data;
  return data;
};

export const deleteProcess = async (id) => {
  const response = await axiosConfig.delete(`/processes/${id}`, {});
  const data = await response.data;
  return data;
};

export const updateProcess = async (dataValues, id) => {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axiosConfig.put(
    `/processes/${id}`,
    dataValues,
    configHeader
  );
  const data = await response.data;
  return data;
};
