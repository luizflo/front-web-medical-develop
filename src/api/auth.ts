import { useDispatch, useSelector } from 'react-redux'
import { ILoginData, ILoginResponseData } from 'src/interfaces'
import { api } from 'src/services/api'
import nookies, { setCookie, parseCookies, destroyCookie } from 'nookies'
import { AppState } from 'src/store'
import { ActionTypes, UserState } from 'src/store/user/types'

export const postLogin = async ({ email, password, role }: ILoginData) => {
  // const dispatch = useDispatch()
  // const { userToken } = useSelector<AppState, UserState>(
  //   (state) => state.userState,
  // )
  return await api
    .post("sessions", {
      email: email,
      password: password,
      role: role,
    })
    .then((res) => {
      const data: ILoginResponseData = res.data;
      setCookie(undefined, "userToken", data.accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: true,
      });
      setCookie(undefined, "userRole", role, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: true,
      });
      return res.data;
    })
    .catch((err) => err.response.data);
}
