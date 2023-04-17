import { AuthProvider } from '@pankod/refine-core'
import nookies, { setCookie, parseCookies, destroyCookie } from 'nookies'
import { ILoginData } from 'src/interfaces'
import Router from 'next/router'
import { postLogin } from './api/auth'

const mockUsers = [
  {
    username: 'admin',
    roles: ['admin'],
  },
  {
    username: 'editor',
    roles: ['editor'],
  },
]

export const authProvider: AuthProvider = {
  login: async ({ token, route }) => {
    if (token) {
      // Router.push(route)
      return Promise.resolve(route);
    }
    // Suppose we actually send a request to the back end here
    return Promise.reject()
  },
  logout: ({ redirectPath }) => {
    return Promise.resolve(redirectPath)
  },
  checkError: (error) => {
    if (error && error.statusCode === 401) {
      return Promise.reject()
    }

    return Promise.resolve()
  },
  checkAuth: () => {
    const { ["userToken"]: token } = parseCookies();
    const { ["userRole"]: role } = parseCookies();


    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => {
    const auth = nookies.get()['userRole']
    if (auth) {
      const parsedUser = JSON.parse(auth)
      return Promise.resolve(parsedUser.roles)
    }
    return Promise.reject('/')
  },
  // getUserIdentity: () => {
  //   const auth = nookies.get()['auth']
  //   if (auth) {
  //     const parsedUser = JSON.parse(auth)
  //     return Promise.resolve(parsedUser.username)
  //   }
  //   return Promise.reject()
  // },
}
