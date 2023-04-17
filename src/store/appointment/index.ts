import { ActionTypesAppointment, Action, AppointmentState } from "./types";
import { UserInterface } from "../../interfaces/user";
import { IAppointment, IUser } from "src/interfaces";

const INITIAL_STATE: AppointmentState = {
  appointment: {} as IAppointment,
  cameFromCall: false,
  callOnGoing: false,
};

export default function reducer(
  state = INITIAL_STATE,
  action: Action
): AppointmentState {
  switch (action.type) {
    case ActionTypesAppointment.SAVE_APPOINTMENT:
      return {
        ...INITIAL_STATE,
        appointment: action.appointment,
      };
    case ActionTypesAppointment.SEE_DETAILS_FROM_CALL:
      return {
        ...state,
        cameFromCall: action.cameFromCall,
      };
    case ActionTypesAppointment.SET_CALL_ON_GOING:
      return {
        ...state,
        callOnGoing: action.callOnGoing,
      };
    default:
      return state;
  }
}
