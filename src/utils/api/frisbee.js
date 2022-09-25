import axiosConfig from "./axios";

// export const createMenu = async (values, idUser, idRestaurant) => {
//   const dataProduct = values;
//   const configHeader = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   const response = await axiosConfig.post(
//     `/users/${idUser}/restaurants/${idRestaurant}/menus`,
//     dataProduct,
//     configHeader
//   );
//   const data = await response.data;
//   return data;
// };

export const getListFrisbee = async () => {
  const response = await axiosConfig.get(
    `/frisbees`,
    {}
  );
  const data = await response.data;
  return data;
};

export const getFrisbeeById = async (id) => {
    const response = await axiosConfig.get(
      `/frisbees/${id}`,
      {}
    );
    const data = await response.data;
    return data;
  };

export const deleteFrisbee = async (id) => {
  const response = await axiosConfig.delete(
    `/frisbees/${id}`,
    {}
  );
  const data = await response.data;
  return data;
};

// export const updateFrisbee = async (values, idUser, idRestaurant, idMenu) => {
//   const dataProduct = values;
//   const configHeader = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   const response = await axiosConfig.put(
//     `/users/${idUser}/restaurants/${idRestaurant}/menus/${idMenu}`,
//     dataProduct,
//     configHeader
//   );
//   const data = await response.data;
//   return data;
// };
