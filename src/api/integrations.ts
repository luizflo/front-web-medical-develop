import { StripePostBody, ICard } from "src/interfaces/stripe";
import { api } from "src/services/api";

export const postStripeSubscription = async (
  patientId: string,
  priceId: string,
  card: string | ICard
) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const body = {
    patientId: patientId,
    priceId: priceId,
    card: card,
  };
  return await api
    .post(`integrations/stripe/subscription`, body, axiosConfig)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
};
export const getStripeCards = async (stripeCardId: string) => {
  const userToken = localStorage.getItem("@logged:user-token");
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };
  return await api
    .get(`integrations/stripe/cards/${stripeCardId}`, axiosConfig)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
