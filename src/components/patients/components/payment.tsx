import React, { useEffect, useState } from 'react'
import styles from '../../../../pages/patient/CheckoutPlans/checkout.module.scss'
import { useRouter } from 'next/router'
import {
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
  Checkbox,
} from '@mui/material'
import {
  ExpandMore,
  ArrowForwardIos,
  Check,
  AddCircleOutlineRounded,
} from '@mui/icons-material'
// import Logo from '../../public/logo_black.png'
import { Box } from '@mui/system'
import Input from '@components/layout/Input'
import { Control } from "react-hook-form";
import CreditCard from "@public/images/checkout/creditCard.svg";
import CVV from "@public/images/checkout/cvv.svg";
import UserIcon from "@public/images/checkout/user.svg";
import Validity from "@public/images/checkout/validity.svg";
import Credentials from "@public/images/checkout/credentials.svg";

type Props = {
  control: Control<any>;
  onClick: () => void;
};

export default function PaymentMethod({ onClick, control }: Props) {
  return (
    <Grid xs={7} className={styles.gridContent}>
      <Typography
        variant="subtitle1"
        fontWeight={"medium"}
        className={styles.title}
      >
        Checkout
      </Typography>
      {/* <Typography variant="h3" className={styles.subtitle}>
        Cartões salvos
      </Typography> */}
      <Box className={styles.forms}>
        <Input
          control={control}
          Icon={CreditCard}
          label="Número do cartão"
          inputName="number"
          inputMask="9999 9999 9999 9999"
          index={0}
          placeholder="Digite o número do cartão"
        />
        <Grid container className={styles.row}>
          <Grid xs={12} md={6} item>
            <Input
              control={control}
              label="Validade"
              Icon={Validity}
              inputName="cardValidity"
              inputMask="99/9999"
              index={1}
              placeholder="MM/AAAA"
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <Input
              control={control}
              label="CVV"
              inputName="cvc"
              Icon={CVV}
              containerStyle={{ marginLeft: "20px" }}
              inputMask="999"
              index={2}
              placeholder="Digite o código"
            />
          </Grid>
        </Grid>
        {/* <Input
          label="Nome do titular"
          control={control}
          inputName="cardName"
          inputMask=""
          inputValue=""
          index={3}
          placeholder="Digite o nome do titular"
        />
        <Input
          control={control}
          label="CPF"
          inputName="cpf"
          inputMask="999.999.99-99"
          inputValue=""
          index={4}
          placeholder="Digite o cpf do titular"
        /> */}
      </Box>
    </Grid>
  );
}
