import React, { useEffect, useState } from 'react'
import styles from './loading.module.scss'
import { useRouter } from 'next/router'
import {
  Grid,
  CircularProgress,
  LinearProgress,
  Box,
  useMediaQuery,
} from "@mui/material";
import Logo from "public/LogoDefault.svg";
import Image from "next/image";
import { useAuthenticated, usePermissions } from "@pankod/refine-core";
import { parseCookies } from "nookies";

export default function Loading({ onClick }: any) {
  const router = useRouter();
  const { isError, isLoading, isSuccess, data } = useAuthenticated();
  const { ["userRole"]: role } = parseCookies();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  // const {isError: erro, data: dataPermissions, isSuccess: success} = usePermissions()

  router.push("/patient/createAccount");
  // if (isSmallScreen) {
  //   window.location.replace("https://hausey.net/index.php/app/");
  // }
  return (
    <Box className={styles.content}>
      <Image src={Logo} />
      <CircularProgress color="primary" sx={{ marginTop: 5 }} />
    </Box>
  );
}
