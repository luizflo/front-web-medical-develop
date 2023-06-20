import { GetServerSideProps } from "next";
export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { parseCookies } from "nookies";
import { useAuthenticated } from "@pankod/refine-core";

import dataProvider from "@pankod/refine-simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

import { authProvider } from "src/authProvider";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { isAuthenticated, ...props } = await checkAuthentication(
//     authProvider,
//     context,
//   )
//   // const { ['userToken']: token } = parseCookies(context)

//   // if (!isAuthenticated) {
//   //   return {
//   //     redirect: {
//   //       destination: '/',
//   //       permanent: false,
//   //     },
//   //   }
//   // }

//   return {
//     props: {},
//   }
// }
