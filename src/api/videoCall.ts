import { useDispatch, useSelector } from 'react-redux'
import { ILoginData, ILoginResponseData } from 'src/interfaces'
import { api } from 'src/services/api'
import nookies, { setCookie, parseCookies, destroyCookie } from 'nookies'
import { AppState } from 'src/store'
import { ActionTypes, UserState } from 'src/store/user/types'
import axios from 'axios'

export const postTwillioToken = async (userName: any, roomName: any) => {
  const userToken = localStorage.getItem('@logged:user-token')
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userToken}`,
    },
  }
  let body = {
    identity: userName,
    room: roomName,
  }

  return await api.post('integrations/twilio', body, axiosConfig)  
  .then((res) => res.data)
  .catch((err) => err.response.data)
  
}
