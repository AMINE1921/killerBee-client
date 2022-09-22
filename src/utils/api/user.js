import axiosConfig from "./axios";

export const loginUser = async (values) => {
  const dataLogin = values;

  const configHeader = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosConfig.post("/login", dataLogin, configHeader);
  const data = await response.data;
  return data;
};

// export const registerUser = async (values) => {
//   const dataLogin = values;

//   const configHeader = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   const response = await axiosConfig.post("/register", dataLogin, configHeader);
//   const data = await response.data;
//   return data;
// };

export const verifyLoggedIn = async () => {
  const response = await axiosConfig.get("/protected", {});
  const data = await response.data;
  return data;
};

export const logOutUser = async () => {
  const response = await axiosConfig.get("/logout", {});
  const data = await response.data;
  return data;
};

export const getUserInfos = async (id) => {
  const response = await axiosConfig.get(`/users/${id}`, {});
  const data = await response.data;
  return data;
};

export const updateUser = async (newUser, idUser) => {
  const dataUser = {
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    mail: newUser.mail,
    phone: newUser.phone,
    street: newUser?.address.street,
    city: newUser?.address.city,
    country: newUser?.address.country,
    placeId: newUser?.address.placeId,
    lat: newUser?.address.lat,
    lng: newUser?.address.lng,
  };

  const configHeader = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axiosConfig.put(
    `/users/${idUser}`,
    dataUser,
    configHeader
  );
  const data = await response.data;
  return data;
};

export const deleteUser = async (id) => {
  const response = await axiosConfig.delete(`/users/${id}`, {});
  const data = await response.data;
  return data;
};
