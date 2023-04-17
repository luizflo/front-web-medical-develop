import { ICreateAccountData, IUpdateAccountData } from 'src/interfaces'
import { api } from 'src/services/api'

export const getMemedToken = async (search: string) => {
  const userToken = localStorage.getItem('@logged:user-token')
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
    },
  }
  return await api
    .get(`integrations/memed/prescriptions/users/${search}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
export const postPrescriptionData = async (
  externalId: number,
  appointmentId: string
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const memedToken = localStorage.getItem("@Memed:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const body = {
    appointmentId: appointmentId,
    externalId: externalId,
    token: memedToken,
  };
  return await api
    .post(`prescriptions`, body, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const deletePrescriptionData = async (externalId: number) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };

  return await api
    .delete(`prescriptions/${externalId}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
