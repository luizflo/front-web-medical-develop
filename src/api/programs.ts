import { api } from "src/services/api";


export const getPrograms = async () => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get("programs", axiosConfig)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
};
export const getPlans = async () => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get("plans", axiosConfig)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
};
