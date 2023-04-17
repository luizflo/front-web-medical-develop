import React, { useEffect, useState } from "react";
import styles from "../patient.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Grid,
  Typography,
  TextField,
  Box,
  MenuItem,
  Select,
  Dialog,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Paper,
  CircularProgress,
  Modal,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface ModalProps {
  handleClose: () => void;
  open: any;
  link: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalOnboarding({
  handleClose,
  open,
  link,
}: ModalProps) {
  const doctors = ["Jonathan Richard", "Luiz Felipe", "Bianca Canezin"];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Modal
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      className={styles.modalPaywall}
      // onClose={handleClose}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>
          Parabéns! Você concluiu o seu cadastro na Hausey
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Sem mensalidade</TableCell>
                <TableCell align="left">Mensalidade Saúde Geral</TableCell>
                <TableCell align="left">
                  Program de Saúde mental + Saúde geral
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Clínico Geral</TableCell>
                <TableCell>R$70</TableCell>
                <TableCell>R$50</TableCell>
                <TableCell>R$40</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Psicólogo</TableCell>
                <TableCell>R$70</TableCell>
                <TableCell>R$70</TableCell>
                <TableCell>R$50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Especialista</TableCell>
                <TableCell>R$100</TableCell>
                <TableCell>R$100</TableCell>
                <TableCell>R$80</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* {isLoading ? (
          <CircularProgress
            color="primary"
            sx={{ marginTop: 5, zIndex: 100 }}
          />
        ) : null} */}
      </Box>
    </Modal>
  );
}
