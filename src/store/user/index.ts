import { UserState, ActionTypes, Action } from './types'
import { UserInterface } from '../../interfaces/user'
import { IUser, Manager, Patient, Professional } from "src/interfaces";

const INITIAL_STATE: UserState = {
  error: "",
  loading: false,
  rendering: true,
  userToken: "",
  role: "",
  user: {} as UserInterface,
  userLogged: {} as Patient | Professional | Manager,
};

export default function reducer(
  state = INITIAL_STATE,
  action: Action
): UserState {
  switch (action.type) {
    case ActionTypes.RESET_STATE:
      return {
        ...INITIAL_STATE,
        rendering: false,
      };

    case ActionTypes.AUTHENTICATION:
      return {
        ...INITIAL_STATE,
        rendering: action.rendering,
        loading: true,
      };

    case ActionTypes.AUTHENTICATION_PACIENT_SUCCESS:
      return {
        error: "",
        loading: false,
        rendering: false,
        userToken: action.userToken,
        role: action.role,
        user: action.user,
        userLogged: action.userLogged,
      };
    case ActionTypes.AUTHENTICATION_PROFESSIONAL_SUCCESS:
      return {
        error: "",
        loading: false,
        rendering: false,
        userToken: action.userToken,
        role: action.role,
        user: action.user,
        userLogged: action.userLogged,
      };
    case ActionTypes.AUTHENTICATION_MANAGER_SUCCESS:
      return {
        error: "",
        loading: false,
        rendering: false,
        userToken: action.userToken,
        role: action.role,
        user: action.user,
        userLogged: action.userLogged,
      };
    case ActionTypes.AUTHENTICATION_ERROR:
      return {
        ...INITIAL_STATE,
        error: action.error,
        rendering: false,
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        userLogged: action.userLogged,
        rendering: false,
      };


    case ActionTypes.FINISH_RENDERING:
      return {
        ...state,
        rendering: false,
      };

    default:
      return state;
  }
}
