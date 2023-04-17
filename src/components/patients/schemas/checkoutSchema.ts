import * as yup from "yup";

export const schema = yup.object({
  cardValidity: yup.string().required("Esse campo não pode ficar em branco"),
  cvc: yup.string().required("Esse campo não pode ficar em branco"),
  number: yup
    .string()
    .min(19, "Insira um número de cartão válido")
    .required("Esse campo não pode ficar em branco"),
});
