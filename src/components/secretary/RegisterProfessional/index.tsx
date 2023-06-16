import React, { ChangeEvent, useState } from "react";
import {
  AccountCircle,
  AddAPhoto,
  Close,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Step,
  StepIconProps,
  SelectChangeEvent,
  OutlinedInput,
  Select,
  Chip,
  StepLabel,
  Stepper,
  styled,
  Typography,
  MenuItem,
  Theme,
  useTheme,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputMask from "react-input-mask";
import * as yup from "yup";

import styles from "./style.module.scss";
import { ILanguage, ISpecialty } from "src/interfaces";
type Props = {
  open: boolean;
  handleClose: () => void;
  activeStep: number;
  handleFormSubmit: (data: any) => Promise<boolean>;
  groupSelected: string;
  handleChangeGroup: (event: ChangeEvent<HTMLInputElement>) => void;
  specialties: ISpecialty[];
  specialtySelected: string;
  handleChangeSpecialty: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleChangeUF: (event: ChangeEvent<HTMLInputElement>) => void;
  UFSelected: string;
  imageDisplay: string;
  isLoading: boolean;
  handlePhotoUpload: () => Promise<void>;
  fileInput: React.MutableRefObject<any>;
  handleFileInput: () => void;
  languageSelected: string[];
  languages: ILanguage[];
  handleSelectLanguages: (event: SelectChangeEvent<string[]>) => void;
};
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const initialValues = {
  name: "",
  email: "",
  birthdate: "",
  price: "",
  document: "",
  phoneNumber: "",
  specialtyId: "",
  password: "",
  registration: "",
  registrationUf: "",
};
const UF = [
  "RO",
  "AC",
  "AM",
  "RR",
  "PA",
  "AP",
  "TO",
  "MA",
  "PI",
  "CE",
  "RN",
  "PB",
  "PE",
  "AL",
  "SE",
  "BA",
  "MG",
  "ES",
  "RJ",
  "SP",
  "PR",
  "SC",
  "RS",
  "MS",
  "MT",
  "GO",
  "DF",
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const RegisterProfessional = ({
  open,
  handleClose,
  activeStep,
  handleFormSubmit,
  groupSelected,
  handleChangeGroup,
  specialties,
  specialtySelected,
  handleChangeSpecialty,
  handleChange,
  handleChangeUF,
  UFSelected,
  imageDisplay,
  isLoading,
  handlePhotoUpload,
  fileInput,
  handleFileInput,
  languageSelected,
  languages,
  handleSelectLanguages,
}: Props): JSX.Element => {
  const [passWordVisible, setPassWordVisible] = useState<boolean>(false);
  const registerSteps = ["Cadastrar dados", "Upload da foto"];
  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#12CC7E",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#12CC7E",
    }),
  }));
  const theme = useTheme();

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <AccountCircle fontSize="medium" />,
      2: <AddAPhoto fontSize="medium" />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const renderError = (message: any) => (
    <p className={styles.errorMessage}>{message}</p>
  );
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Digite o nome completo")
      .required("Esse campo não pode ficar em branco"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Esse campo não pode ficar em branco"),
    cpf: yup
      .string()
      .length(14, "Digite um CPF válido")
      .required("Esse campo não pode ficar em branco"),
    password: yup
      .string()
      .min(8, "*A senha deve conter pelo menos 8 caracteres")
      .required("Esse campo não pode ficar em branco"),
    phoneNumber: yup
      .string()
      .min(15, "Insira um telefone válido")
      .required("Esse campo não pode ficar em branco"),
    price: yup.string().required("Esse campo não pode ficar em branco"),
    professionalSpecialty: yup.string(),
    // .required('Esse campo não pode ficar em branco'),
    professionalType: yup.string(),
    // .required('Esse campo não pode ficar em branco'),
    specialtyRegistration: yup.string(),
    dateOfBirth: yup.string().required("Esse campo não pode ficar em branco"),
    registration: yup.string().required("Esse campo não pode ficar em branco"),
    registrationUf: yup.string(),
  });

  return (
    <Modal keepMounted open={open}>
      <Box sx={style} className={styles.modal}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h2"
            fontWeight={"medium"}
            className={styles.titleModal}
          >
            Cadastrar profissional
          </Typography>
          {activeStep === 0 && (
            <Close className={styles.exit} onClick={handleClose} />
          )}
        </Box>
        <Box sx={{ width: "60%", alignSelf: "center", marginTop: "15px" }}>
          <Stepper activeStep={activeStep}>
            {registerSteps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await handleFormSubmit(values).then((res) =>
              res ? resetForm() : null
            );
          }}
        >
          <Form>
            {activeStep === 0 ? (
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={styles.inputTitle}>Grupo</Typography>
                  <Field
                    as="select"
                    name="professionalSpecialty"
                    className={styles.selectSpecialty}
                    value={groupSelected}
                    onChange={handleChangeGroup}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      style={{ fontSize: 14, paddingBlock: 15 }}
                    >
                      {" "}
                      Selecione o grupo
                    </option>
                    {specialties?.map((item, index) => (
                      <option
                        key={index}
                        value={item.group}
                        className={styles.option}
                        style={{ fontSize: 20 }}
                        // onClick={() => handleChange(item)}
                      >
                        {item.group}
                      </option>
                    ))}
                  </Field>
                  <Typography className={styles.inputTitle}>
                    Nome completo
                  </Typography>
                  <Field
                    name="name"
                    className={styles.inputCupom}
                    placeholder="Digite o nome do profissional"
                  />
                  <ErrorMessage name="name" render={renderError} />
                  <Typography className={styles.inputTitle}>CPF</Typography>
                  <Field
                    name="cpf"
                    as={(props: any) => (
                      <InputMask
                        {...props}
                        mask={"999.999.999-99"}
                        maskChar={null}
                        className={styles.inputCupom}
                        style={{ paddingLeft: "20px" }}
                        type={"text"}
                      />
                    )}
                    placeholder="Digite o CPF do profissional"
                  />
                  <ErrorMessage name="cpf" render={renderError} />
                  <Typography className={styles.inputTitle}>CRM</Typography>
                  <div
                    className={styles.containerCRM}
                    style={{ alignItems: "center" }}
                  >
                    <Field
                      name="registrationUf"
                      onChange={handleChangeUF}
                      value={UFSelected}
                      className={styles.selectUF}
                      as="select"
                    >
                      <option
                        value=""
                        disabled
                        selected
                        style={{ fontSize: 14, paddingBlock: 15 }}
                      >
                        {" "}
                        UF
                      </option>
                      {UF?.map((item) => (
                        <option
                          key={item}
                          value={item}
                          style={{ fontSize: "12px !important" }}
                        >
                          {item}
                        </option>
                      ))}
                    </Field>
                    <Field
                      name="registration"
                      type={"text"}
                      placeholder="ex: 00000"
                      className={styles.inputCRM}
                    />
                  </div>
                  <ErrorMessage name="registration" render={renderError} />
                  <Typography className={styles.inputTitle}>Email</Typography>
                  <Field style={{ display: "none" }} />
                  <Field
                    name="email"
                    type={"email"}
                    placeholder="ex: joao@gmail.com"
                    className={styles.inputCupom}
                  />
                  <ErrorMessage name="email" render={renderError} />
                  <Typography className={styles.inputTitle}>
                    Preço da Consulta(R$)
                  </Typography>
                  <Field
                    name="price"
                    type="number"
                    className={styles.inputCupom}
                    placeholder="Digite o preço.."
                  />
                  <ErrorMessage name="price" render={renderError} />
                </Grid>
                {/* Coluna da Direita */}
                <Grid item xs={4}>
                  <Typography className={styles.inputTitle}>
                    Especialidade
                  </Typography>
                  <Field
                    as="select"
                    name="professionalSpecialty"
                    className={styles.selectSpecialty}
                    value={specialtySelected}
                    onChange={handleChangeSpecialty}
                  >
                    <option
                      value=""
                      disabled
                      selected
                      style={{ fontSize: 14, paddingBlock: 15 }}
                    >
                      {" "}
                      Selecione a especialidade
                    </option>
                    {specialties?.map((item) =>
                      item.group === groupSelected
                        ? item.specialties.map((specialty) => (
                            <option
                              key={specialty.id}
                              value={specialty.id}
                              style={{ fontSize: 20 }}
                              className={styles.selectOption}
                              // onClick={() => handleChange(item)}
                            >
                              {specialty.name}
                            </option>
                          ))
                        : null
                    )}
                  </Field>
                  <Typography className={styles.inputTitle}>Idiomas</Typography>
                  <Field
                    name="languages"
                    as={() => (
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        className={styles.selectLanguage}
                        value={languageSelected}
                        onChange={handleSelectLanguages}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {languages.map((item) => (
                          <MenuItem
                            key={item.id}
                            value={item.name}
                            style={getStyles(
                              item.name,
                              languageSelected,
                              theme
                            )}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Typography className={styles.inputTitle}>
                    Telefone
                  </Typography>
                  <Field
                    name="phoneNumber"
                    as={(props: any) => (
                      <InputMask
                        {...props}
                        mask={"(99) 99999-9999"}
                        maskChar={null}
                        className={styles.inputCupom}
                        style={{ paddingLeft: "20px" }}
                        type={"text"}
                      />
                    )}
                    placeholder="ex: (43) 99999-0000"
                  />
                  <ErrorMessage name="phoneNumber" render={renderError} />
                  <Typography className={styles.inputTitle}>
                    Data de nascimento
                  </Typography>
                  <Field
                    name="dateOfBirth"
                    as={(props: any) => (
                      <InputMask
                        {...props}
                        mask={"99/99/9999"}
                        maskChar={null}
                        className={styles.inputCupom}
                        style={{ paddingLeft: "20px" }}
                        type={"text"}
                      />
                    )}
                    placeholder="dd/mm/aaaa"
                  />
                  <ErrorMessage name="dateOfBirth" render={renderError} />
                  <Typography className={styles.inputTitle}>
                    Nova senha
                  </Typography>
                  <div className={styles.rowInput}>
                    <Field
                      name="password"
                      autoComplete="new-password"
                      placeholder="Crie uma senha de acesso"
                      type={passWordVisible ? "text" : "password"}
                      className={styles.inputCupom}
                    />
                    {passWordVisible ? (
                      <VisibilityOff
                        className={styles.iconEye}
                        onClick={() => setPassWordVisible(!passWordVisible)}
                      />
                    ) : (
                      <RemoveRedEye
                        className={styles.iconEye}
                        onClick={() => setPassWordVisible(!passWordVisible)}
                      />
                    )}
                  </div>
                  <ErrorMessage name="password" render={renderError} />
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography className={styles.inputTitle}>
                    Adicione uma foto do profissional
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#dadee5",
                      backgroundImage: imageDisplay
                        ? `url(${imageDisplay})`
                        : "none",
                      backgroundSize: "cover",
                      display: "flex",
                      height: "300px",
                      width: "300px",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleFileInput()}
                  >
                    {!imageDisplay && (
                      <AddAPhoto
                        style={{ fontSize: "50px", color: "#848d9f" }}
                      />
                    )}
                    <input
                      type={"file"}
                      ref={fileInput}
                      accept="image/png, image/jpeg"
                      hidden
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              {activeStep === 0 ? (
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.buttonBlue}
                >
                  <Typography
                    variant="body2"
                    className={styles.textButtonConfirm}
                  >
                    {isLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Prosseguir"
                    )}
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={styles.buttonBlue}
                  disabled={!imageDisplay}
                  onClick={() => handlePhotoUpload()}
                >
                  <Typography
                    variant="body2"
                    className={styles.textButtonConfirm}
                  >
                    {isLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Finalizar cadastro"
                    )}
                  </Typography>
                </Button>
              )}
            </div>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};
