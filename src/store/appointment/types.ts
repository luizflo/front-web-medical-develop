/* eslint-disable no-unused-vars, no-shadow, max-len */
import { IAppointment, IUser } from 'src/interfaces'
import { UserInterface } from '../../interfaces/user'

export interface AppointmentState {
  readonly appointment: IAppointment;
  readonly cameFromCall: boolean;
  readonly callOnGoing: boolean;
}

export enum ActionTypesAppointment {
  SAVE_APPOINTMENT = "appointment/SAVE_APPOINTMENT",
  SEE_DETAILS_FROM_CALL = "appointment/SEE_DETAILS_FROM_CALL",
  SET_CALL_ON_GOING = "appointment/SET_CALL_ON_GOING",
}

export interface AuthenticationAction {
  type: ActionTypesAppointment.SAVE_APPOINTMENT;
  appointment: IAppointment;
}
export interface SeeDetailsAction {
  type: ActionTypesAppointment.SEE_DETAILS_FROM_CALL;
  cameFromCall: boolean;
}
export interface SetCallOnGoing {
  type: ActionTypesAppointment.SET_CALL_ON_GOING;
  callOnGoing: boolean;
}

export type Action = AuthenticationAction | SeeDetailsAction | SetCallOnGoing;
