/* eslint-disable no-unused-vars, no-shadow, max-len */
import { IUser, Manager, Patient, Professional } from "src/interfaces";
import { UserInterface } from "../../interfaces/user";

export interface UserState {
  readonly error: string;
  readonly loading: boolean;
  readonly rendering: boolean;
  readonly userToken: string;
  readonly role: string;
  readonly user: UserInterface;
  readonly userLogged: Patient | Professional | Manager;
}

export enum ActionTypes {
  AUTHENTICATION = "user/AUTHENTICATION",
  AUTHENTICATION_PACIENT_SUCCESS = "user/AUTHENTICATION_PACIENT_SUCCESS",
  AUTHENTICATION_PROFESSIONAL_SUCCESS = "user/AUTHENTICATION_PROFESSIONAL_SUCCESS",
  AUTHENTICATION_MANAGER_SUCCESS = "user/AUTHENTICATION_MANAGER_SUCCESS",
  CREATEACCOUNT_SUCCESS = "user/AUTHENTICATION_SUCCESS",
  AUTHENTICATION_ERROR = "user/AUTHENTICATION_ERROR",
  RESET_STATE = "user/RESET_STATE",
  FINISH_RENDERING = "user/FINISH_RENDERING",
  UPDATE_USER = "user/UPDATE_USER",
}

export interface AuthenticationAction {
  type: ActionTypes.AUTHENTICATION;
  rendering: boolean;
}

export interface AuthenticationPatientSuccessAction {
  type: ActionTypes.AUTHENTICATION_PACIENT_SUCCESS;
  userToken: string;
  role: string;
  user: UserInterface;
  userLogged: Patient;
}
export interface AuthenticationProfessionalSuccessAction {
  type: ActionTypes.AUTHENTICATION_PROFESSIONAL_SUCCESS;
  userToken: string;
  role: string;
  user: UserInterface;
  userLogged: Professional;
}
export interface AuthenticationManagerSuccessAction {
  type: ActionTypes.AUTHENTICATION_MANAGER_SUCCESS;
  userToken: string;
  role: string;
  user: UserInterface;
  userLogged: Manager;
}

export interface AuthenticationErrorAction {
  type: ActionTypes.AUTHENTICATION_ERROR;
  error: string;
}

export interface ResetStateAction {
  type: ActionTypes.RESET_STATE;
}

export interface FinishRenderingAction {
  type: ActionTypes.FINISH_RENDERING;
}
export interface UpdateUserAction {
  type: ActionTypes.UPDATE_USER;
  userLogged: Patient;
}

export type Action =
  | AuthenticationAction
  | AuthenticationPatientSuccessAction
  | AuthenticationProfessionalSuccessAction
  | AuthenticationManagerSuccessAction
  | AuthenticationErrorAction
  | ResetStateAction
  | UpdateUserAction
  | FinishRenderingAction;
