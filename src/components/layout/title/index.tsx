import React from 'react'
import { useRouterContext, TitleProps } from '@pankod/refine-core'
import { Button, Grid, Typography } from '@pankod/refine-mui'
import iconUser from '../../../../public/images/menu/user.png'
import iconMedal from '../../../../public/images/menu/medal.svg'
import Logo from "public/LogoDefault.svg";

import Image from "next/image";
import styles from "./title.module.scss";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Grid>
      <Button
        fullWidth
        variant="text"
        disableRipple
        style={{ justifyContent: "initial", padding: "20px" }}
      >
        <Link href="/">
          {collapsed ? (
            <Image src="/icon.png" alt="Refine" width={28} />
          ) : (
            <Image src={Logo} alt="logo" width="90px" height="50px" />
          )}
        </Link>
      </Button>
      {/* {!collapsed ? (
        <Grid>
          <Grid className={styles.logoUser}>
            <Image alt="no-alt" src={iconUser} />
          </Grid>
          <Typography className={styles.textName}>Luiz Felipe Lopes ></Typography>
          <Typography className={styles.textPlan}><Image alt="no-alt" src={iconMedal} />Plano básico</Typography>
        </Grid>
      ) : ""} */}
    </Grid>
  );
};
