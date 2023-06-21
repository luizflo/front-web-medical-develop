import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../professionals.module.scss";
import {
  alpha,
  Box,
  Button,
  Grid,
  Typography,
  AlertProps,
  SelectChangeEvent,
} from "@mui/material";
import InputMask from "react-input-mask";
import {
  IPostProfessional,
  ISpecialties,
  IProfessionalType,
  Professional,
  ISpecialty,
  ILanguage,
} from "src/interfaces";
import Image from "next/image";

import {
  RemoveRedEye,
  VisibilityOff,
  Close,
  AddAPhoto,
  AccountCircle,
} from "@mui/icons-material";
import Input from "@components/layout/Input";
import Link from "next/link";
import logoStethoscope from "@public/images/secretary/stethoscope.png";
import logoDocument from "../../../../public/images/secretary/document.png";
import userLogo from "../../../../public/user.png";
import {
  createNewProfessional,
  getTypes,
  getLanguages,
  postProfilePicture,
} from "src/api/professional";

import { getSpecialties } from "src/api/professional";
import FeedBack from "@components/layout/feedback";
import EmptyComponent from "@components/layout/emptyComponent";
import { RegisterProfessional } from "@components/secretary/RegisterProfessional";

function Header(props: any) {
  return (
    <Grid item xs={12}>
      <Box className={styles.rowSpace}>
        <Box>
          <Typography
            variant="caption"
            fontWeight={"medium"}
            className={styles.title}
          >
            Profissionais
          </Typography>
          <Typography variant="h3" className={styles.subtitle}>
            {props.length} cadastros
          </Typography>
        </Box>
        <Box className={styles.end}>
          <Button
            variant="contained"
            className={styles.buttonBlue}
            onClick={props.handleOpen}
          >
            <Typography variant="body1" className={styles.textButtonConfirm}>
              Cadastrar profissional +
            </Typography>
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
interface ListProps {
  onClick: (professional: Professional) => void;
  listProfessionals: Professional[];
  loading: boolean;
  getProfessionalsList: () => void;
}
export default function List({
  onClick,
  listProfessionals,
  loading,
  getProfessionalsList,
}: ListProps) {
  const fileInput = useRef(null);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [groupSelected, setGroupSelected] = useState<string>("");
  const [specialtySelected, setSpecialtySelected] = useState<string>("");
  const [UFSelected, setUFSelected] = useState<string>("");
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [imageFile, setImageFile] = useState<FormData>();
  const [imageDisplay, setImageDisplay] = useState<string>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [languagesSelected, setLanguagesSelected] = useState<string[]>([]);
  const [languagesPost, setLanguagesPost] = useState<string[]>([]);
  const [professionalId, setProfessionalId] = useState<string>("");

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleCloseFeedback = () => setFeedbackIsOpen(false);

  const getSpecialtiesLocal = async () => {
    const response = await getSpecialties();
    setSpecialties(response);
  };
  const getLanguagesArray = async () => {
    const response = await getLanguages();
    setLanguages(response);
  };
  const handleChangeUF = (event: ChangeEvent<HTMLInputElement>) => {
    setUFSelected(event.target.value);
  };
  const handleFileInput = () => {
    //@ts-ignore
    fileInput.current.click();
  };

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    let succeed = false;
    const splittedDate = data.dateOfBirth.split("/");
    const languagesFiltered = languages.filter(
      (language) =>
        languagesSelected.filter((item) => item === language.name).length > 0
    );
    const postLang: string[] = [];
    languagesFiltered.map((item) => postLang.push(item.id));
    const [day, month, year] = splittedDate;
    const body: IPostProfessional = {
      name: data.name,
      email: data.email,
      birthdate: `${year}-${month}-${day}`,
      document: data.cpf.replace(/[^\d]/g, ""),
      phoneNumber: data.phoneNumber.replace(/[^\d]/g, ""),
      specialties: [specialtySelected!!],
      registration: data.registration,
      registrationUf: UFSelected,
      password: data.password,
      price: data.price,
      languages: postLang,
    };
    const response = await createNewProfessional(body);
    if (response.status === "error") {
      setFeedbackIsOpen(true);
      setFeedBackType("error");
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      setFeedBackType("success");
      setFeedbackIsOpen(true);
      setFeedback("Profissional Cadastrado com sucesso!");
      setIsLoading(false);
      setProfessionalId(response.id);
      getProfessionalsList();
      handleNext();
      succeed = true;
    }
    return succeed;
  };
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    event.preventDefault();
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      setImageDisplay(URL.createObjectURL(fileUploaded));
      const formData = new FormData();
      formData.append("file", fileUploaded);
      setImageFile(formData);
      setIsLoading(false);
    }
  };
  const handlePhotoUpload = async () => {
    if (imageFile) {
      setIsLoading(true);
      const response = await postProfilePicture(imageFile, professionalId);
      if (response.status === "error") {
        setFeedbackIsOpen(true);
        setFeedBackType("error");
        setFeedback(response.message);
        setIsLoading(false);
      } else {
        setFeedBackType("success");
        setFeedbackIsOpen(true);
        setFeedback("Profissional Cadastrado com sucesso!");
        setIsLoading(false);
        getProfessionalsList();
        handleClose();
      }
    }
  };

  function TableHeader() {
    return (
      <Grid
        container
        className={styles.row}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Grid
          item
          xs={3}
          style={{
            marginLeft: "0px",
            maxWidth: "250px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Nome completo{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            marginLeft: "40px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Email{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            marginLeft: "20px",
            maxWidth: "200px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            CPF{" "}
          </Typography>
        </Grid>
        {/* <Grid
          item
          xs={2}
          style={{
            marginLeft: "20px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Status da Memed{" "}
          </Typography>
        </Grid> */}
      </Grid>
    );
  }
  function TableHistory(props: any) {
    return (
      <Box className={styles.historyList}>
        {props.professionals.length > 0 ? (
          props.professionals.map((item: Professional) => (
            <Grid
              key={item.id}
              container
              className={styles.historyListItem}
              onClick={() => props.handleClick(item)}
            >
              <Grid
                item
                xs={3}
                style={{
                  marginLeft: "0px",
                  maxWidth: "250px",
                }}
              >
                <Typography variant="h4" className={styles.textBlack}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  marginLeft: "40px",
                }}
              >
                <Typography variant="h4" className={styles.textBlue}>
                  {item.email}
                </Typography>
              </Grid>

              <Grid
                item
                xs={2}
                style={{
                  marginLeft: "20px",
                  maxWidth: "200px",
                }}
              >
                <Typography variant="h4" className={styles.textGrey}>
                  {item.document}
                </Typography>
              </Grid>
              {/* <Grid
                item
                xs={2}
                style={{
                  marginLeft: "20px",
                }}
              >
                <Typography variant="h4" className={styles.textGrey}>
                  {item.memedStatus ? item.memedStatus : "Não cadastrado"}
                </Typography>
              </Grid> */}
              <Grid
                item
                xs={1}
                style={{
                  marginLeft: "20px",
                }}
              >
                <Typography variant="h4" className={styles.textBlue}>
                  Ver detalhes
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyComponent
            isLoading={props.isListLoading}
            update={props.getProfessionalsList}
            type={"files"}
            title={"Ainda não há arquivos anexados"}
            message={
              "Anexe arquivos à consulta e atualize a lista no botão abaixo para vê-los aqui"
            }
          />
        )}
      </Box>
    );
  }
  const handleSelectLanguages = (
    event: SelectChangeEvent<typeof languagesSelected>
  ) => {
    const {
      target: { value },
    } = event;
    setLanguagesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeSpecialty = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecialtySelected(event.target.value);
  };
  const handleChangeGroup = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupSelected(event.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    getSpecialtiesLocal();
    getLanguagesArray();
  }, []);

  useEffect(() => {
    console.log("Languages", languagesSelected);
  }, [languagesSelected]);

  return (
    <Grid className={styles.container}>
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Header length={listProfessionals.length} handleOpen={handleOpen} />

      <TableHeader />
      <TableHistory
        isListLoading={loading}
        professionals={listProfessionals}
        handleClick={onClick}
        getProfessionalsList={getProfessionalsList}
      />
      <RegisterProfessional
        open={open}
        activeStep={activeStep}
        UFSelected={UFSelected}
        fileInput={fileInput}
        groupSelected={groupSelected}
        handleChange={handleChange}
        handleChangeGroup={handleChangeGroup}
        handleChangeSpecialty={handleChangeSpecialty}
        handleChangeUF={handleChangeUF}
        handleClose={handleClose}
        handleFileInput={handleFileInput}
        handleFormSubmit={handleFormSubmit}
        handlePhotoUpload={handlePhotoUpload}
        imageDisplay={imageDisplay}
        isLoading={isLoading}
        specialties={specialties}
        specialtySelected={specialtySelected}
        languages={languages}
        languageSelected={languagesSelected}
        handleSelectLanguages={handleSelectLanguages}
      />
    </Grid>
  );
}
