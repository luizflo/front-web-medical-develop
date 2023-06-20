import axios from "axios";

export const api = axios.create({
  //baseURL: process.env.URL_API, // ta bugado
  // baseURL: "https://api.NOME.net/v1/",
  baseURL: "http://ec2-44-201-98-152.compute-1.amazonaws.com:8080/v1", // API de testes
});
