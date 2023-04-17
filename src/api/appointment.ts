import { api } from 'src/services/api'
import { IAnamnesePost, IAppointmentPost } from 'src/interfaces'

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
    .get("specialties?available=true", axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getSlots = async (id: any) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`slots?specialtyId=${id}&days=7`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getPrices = async (specialtyId: any) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments/check-price/${specialtyId}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const getPatientAppointments = async (
  patientId: string,
  finished: boolean
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const url = `appointments?patientId=${patientId}&finished=${finished}`;
  return await api
    .get(url, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const postAppointment = async ({
  specialtyId,
  date,
  card,
  professionalId,
}: IAppointmentPost) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .post(
      `appointments`,
      {
        specialtyId,
        professionalId,
        date,
        card,
      },
      axiosConfig
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const postAnamnese = async ({
  appointmentId,
  description,
}: IAnamnesePost) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const body = {
    anamnesis: description,
  };
  return await api
    .patch(`appointments/${appointmentId}`, body, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const postPrimaryDiagnosis = async ({
  appointmentId,
  description,
}: IAnamnesePost) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const body = {
    primaryDiagnosis: description,
  };
  return await api
    .patch(`appointments/${appointmentId}`, body, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getAppointmentsDesignated = async (finished: boolean) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments?professionalId=!null&finished=${finished}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getAppointmentsWithNoProfessional = async (finished: boolean) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments?professionalId=null&finished=${finished}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getProfessionals = async (specialtyId?: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`professionals/?specialtyId=${specialtyId}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const setProfessional = async (
  appointmentId: string,
  professionalId: string
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(
      `appointments/${appointmentId}/set-professional/${professionalId}`,
      axiosConfig
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getProfessionalAppointments = async (
  professionalId: string,
  finished: boolean
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(
      `appointments?professionalId=${professionalId}&finished=${finished}`,
      axiosConfig
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const postFiles = async (files: FormData, appointmentId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .post(`appointments/${appointmentId}/files`, files, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getFiles = async (appointmentId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments/${appointmentId}/files`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const tooglePaid = async (appointmentId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments/${appointmentId}/toggle-paid`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
export const toogleFinished = async (appointmentId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`appointments/${appointmentId}/toggle-finished`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
