export interface IExams {
  id: number
  name: string
  fileName: string
  fileLink: string
  date: string
  addedIn: string
  size: string
}

export interface IHistoric {
  id: number
  name: string
  doctor: string
  date: string
  event: string
}


export interface IProfessionalType {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  name: string;
  description: string | null;
  price: number | null;
  hasSpecialties: boolean;
}

export interface IProfessionalSpecialty {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  professionalTypeId: string;
  name: string;
  description: string | null;
  price: number | null;
}

export interface IAppointment {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  date: string;
  paid: boolean | null;
  prescriptions: IPrescription[];
  specialtyId: string;
  specialty: IProfessionalSpecialty;
  professionalId: string | null;
  professional: Professional | null;
  patientId: string;
  patient: Patient;
  anamnesis: string | null;
  primaryDiagnosis: string | null;
  finished: boolean;
}
export interface IAppointmentPost {
  specialtyId?: string;
  date?: string;
  professionalId?: string;
  card: ICard;
}
type civilState = "Solteiro(a)" | "Casado(a)" | "Viúvo(a)";
type sexType = "Feminino" | "Masculino";

export interface IPrescription {
  appointmentId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  externalId: number;
  id: string;
  pdfUrl: string;
}
export interface IPatients {
  id: number;
  name: string;
  email: string;
  age: string;
  lastService: string;
  details?: string;
  imgUrl: string | null;
  phoneNumber?: string;
  phoneFormatted?: string;
  cpf?: string;
  dateOfBirth?: string;
  job?: string;
  programs?: string[];
  isMember?: boolean;
  address?: string;
  civilState?: civilState;
  sex?: sexType;
  plan?: string;
}

export interface IHistoric {
  id: number;
  name: string;
  doctor: string;
  date: string;
  event: string;
  specialty?: string;
}
export interface IHistoricDoctor {
  id: number;
  name: string;
  patient: string;
  date: string;
  event: string;
}

export interface IHistoricSpecialist {
  id: number;
  name: string;
  duration: string;
  date: string;
  details: string;
}

export interface IAttendance {
  id: number;
  patient: string;
  date: string;
  hour: string;
}

export interface IAnamnesePost {
  appointmentId: string;
  description: string;
}
export interface IAnamnese {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  description: string | null;
}

export interface ILoginData {
  email: string;
  password: string;
  role: stirng;
}
export interface ILoginResponseData {
  accessToken: string;
  refreshToken: string;
  patient: IUser;
}

export interface ICreateAccountData {
  email: string;
  password: string;
  name: string;
}
export interface IUpdateAccountData {
  document: string;
  birthdate: string;
  sex: string;
  phoneNumber: string;
}
export interface IProgram {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  name: string;
  description: string | null;
  price: number;
}
import { AlertProps } from "@mui/material";
import { ICard } from "./stripe";
export interface FeedBackProps {
  feedBack: string;
  feedbackIsOpen: boolean;
  feedbackType: AlertProps["severity"];
}
export interface IUser {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  birthdate: Date | null;
  document: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  sex: string | null;
}
export interface Patient extends IUser {
  plan: IPlan;
  planId: string;
  address: IAddress;
  addressId: string;
  strpeCustomerId?: string | null;
  planExpiresAt: Date | string | null;
}
export interface Professional extends IUser {
  registration: string;
  registrationUf: string;
  memedStatus: string;
  addressId: string;
  address: IAddress;
  languages: string[];
  image: string | null;
  price: string | null;
}
export interface Manager extends IUser {
  id: string;
}

export interface IPlan {
  createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
  description: string;
  discount: number;
  id: string;
  name: string;
  price: number;
  stripePriceId: string;
}
export interface IAddress {
  professionalId?: string;
  patientId?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipOrPostcode: string;
  country: string;
}
export interface ISpecialty {
  group: string;
  specialties: ISpecialties[];
}
export interface ILanguage {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
}
export interface ISpecialties {
  id: string;
  createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
  name: string;
  price: number;
  professionalTypeId: string;
  description: string | null;
}

export interface IPrices {
  discount: number | null;
  price: number | string;
  total: number | string;
}
export interface ISlot {
  date: string;
  formattedDate: string;
  slots: {
    time: string;
    available: boolean;
  }[];
}
export interface SlotsArr extends Professional {
  slots: ISlot[];
}

export interface IScale {
  day: string;
  dayOfMonth?: string;
  hours: IHour[];
}

export interface IHour {
  text: string;
  selected: boolean;
}
export interface IPostProfessional {
  name: string;
  email: string;
  document: string;
  specialties: string[];
  registrationUf: string;
  registration: string;
  phoneNumber: string;
  birthdate: string;
  password: string;
  price: string;
  languages: string[];
}
export interface IFooterProps {
  showSideWindow: (type: string) => void;
  handleLogout: () => void;
  disableVideo: () => void;
  enableVideo: () => void;
  showMemed: () => void;
  isCameraOn: boolean;
  disableAudio: () => void;
  enableAudio: () => void;
  isMicrophoneOn: boolean;
  handleClickInputButton: () => void;
  fileInput: React.MutableRefObject<any>;
  loading: boolean;
  buttonRef: React.MutableRefObject<any>;
  memedLoading: boolean;
  handleChangeInputFile: (event: any) => Promise<void>;
  openDialogFiles: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
export interface IDiagnosysWindowProps {
  diagnosysInput: string;
  postDiagnosysText: () => Promise<void>;
  saveButtonDisabledDiagnosys: boolean;
  isDiagnosysLoading: boolean;
  onChangeTextFieldDiagnosys: (event: any) => void;
}
export interface IAnamneseWindowProps {
  anamneseInput: string;
  postAnamneseText: () => Promise<void>;
  saveButtonDisabledAnamnese: boolean;
  isAnamneseLoading: boolean;
  onChangeTextFieldAnamnese: (event: any) => void;
}
export interface IVideoChatProps
  extends IFooterProps,
    IDiagnosysWindowProps,
    IAnamneseWindowProps {
  isDiagnosysOpen: boolean;
  isAnamneseOpen: boolean;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  room: any;
  isFinished: boolean;
  setRoom: React.Dispatch<any>;
  openDialogFiles: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedback: React.Dispatch<React.SetStateAction<FeedBackProps>>;
}
export interface IRoomProps
  extends IFooterProps,
    IDiagnosysWindowProps,
    IAnamneseWindowProps {
  room: any;
  isDiagnosysOpen: boolean;
  isAnamneseOpen: boolean;
}
export type Anchor = "top" | "left" | "bottom" | "right";
