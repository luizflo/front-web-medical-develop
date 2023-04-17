import { IPostProfessional } from 'src/interfaces'
import { api } from 'src/services/api'

export const createNewProfessional = async (data: IPostProfessional) => {
  const userToken = localStorage.getItem('@logged:user-token')
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await api
    .post(`professionals`, data, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
export const postProfilePicture = async (
  files: FormData,
  professionalId: string
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .post(`professionals/${professionalId}/image`, files, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getTypes = async () => {
  const userToken = localStorage.getItem('@logged:user-token')
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await api
    .get('professionals/types', axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
export const getLanguages = async () => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get("/languages", axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getProfessionals = async () => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get("professionals", axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getSpecialties = async () => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get("specialties", axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
