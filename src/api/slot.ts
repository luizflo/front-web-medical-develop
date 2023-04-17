import { api } from "src/services/api";

export const postFetch = async () => {
  const data = await fetch("http://3.82.160.172:8000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "xejqqzesylbo@gmaisllll.com",
      password: "2Rj6UTdDfueQh5tp3j",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

};
