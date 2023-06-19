import React, { useEffect, useState } from 'react'
import styles from './input.module.scss'
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
import InputMask from 'react-input-mask'
// import Logo from '../../public/logo_black.png'
import { Box } from '@mui/system'
import CreditCard from '@public/images/checkout/creditCard.svg'
import CVV from '@public/images/checkout/cvv.svg'
import UserIcon from '@public/images/checkout/user.svg'
import Validity from '@public/images/checkout/validity.svg'
import Credentials from '@public/images/checkout/credentials.svg'
import Image from 'next/image'
import { Control, Controller } from "react-hook-form";

interface InputProps {
  label?: string;
  Icon?: typeof React.Component;
  control: Control<any>;
  inputName: string;
  inputValue?: string;
  containerStyle?: React.CSSProperties;
  inputMask?: string;
  placeholder: string;
  type?: string;
  index?: number;
}
export default function Input({
  label,
  inputName,
  inputValue,
  Icon,
  control,
  inputMask,
  containerStyle,
  placeholder,
  type,
  index,
}: InputProps) {
  const router = useRouter();
  const inputIcons = [
    <CreditCard className={styles.iconImage} />,
    <Validity className={styles.iconImage} />,
    <CVV className={styles.iconImage} />,
    <UserIcon className={styles.iconImage} />,
    <Credentials className={styles.iconImage} />,
  ];

  return (
    <Box className={styles.boxInput} sx={containerStyle}>
      <Controller
        control={control}
        name={inputName}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            {label && (
              <Typography variant="body2" className={styles.inputTitle}>
                {label}
              </Typography>
            )}
            <Box className={styles.inputContainer}>
              {Icon && <Icon className={styles.iconImage} />}
              {/* {index !== undefined ? (
                <div className={styles.imageDiv}>{inputIcons[index]}</div>
              ) : null} */}
              <InputMask
                value={value}
                onChange={onChange}
                mask={inputMask ? inputMask : ""}
                className={styles.inputStyle}
                type={type ? type : "text"}
                name={inputName}
                placeholder={placeholder}
              />
            </Box>
            {error && (
              <Typography variant="body1" className={styles.error}>
                {error.message || "Ops, ocorreu um erro"}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
}
