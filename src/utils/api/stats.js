import axiosConfig from "./axios";

export const getAllStats = async () => {
  const response = await axiosConfig.get(`/stats`, {});
  const data = await response.data;
  return data;
};
