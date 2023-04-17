import { ICreateAccountData, IUpdateAccountData } from 'src/interfaces'
import { api } from 'src/services/api'

export const postCreateAccount = async (data: ICreateAccountData) => {
  let body = {
    email: data.email,
    password: data.password,
    name: data.name,
  }
  return await api
    .post('patients', body)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
export const patchCreateAccount = async (
  data: IUpdateAccountData,
  id: string
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  let body = {
    document: data.document,
    birthdate: data.birthdate,
    sex: data.sex,
    phoneNumber: data.phoneNumber,
  };
  return await api
    .patch(`patients/${id}`, body, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getPatients = async (professionalId?: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const url = professionalId
    ? `patients?professionalId=${professionalId}`
    : `patients`;
  return await api
    .get(url, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getPatientInfo = async (patientId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const url = `patients/${patientId}`;
  return await api
    .get(url, axiosConfig)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
};
