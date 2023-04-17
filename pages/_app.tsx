import React, { ReactNode, useEffect, useState } from 'react'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { Refine } from '@pankod/refine-core'
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ErrorComponent,
} from '@pankod/refine-mui'
import routerProvider from '@pankod/refine-nextjs-router'
import dataProvider from '@pankod/refine-simple-rest'
import { authProvider } from 'src/authProvider'
import { Provider, useSelector } from 'react-redux'
// import { MemedProvider } from '../src/hooks'
import MemedProvider from 'src/providers/MemedProvider'
import { PostList, PostCreate, PostEdit } from '@components/posts'
import { Title, Sider, Layout, Header } from '@components/layout'
import { ThemeProvider } from '@pankod/refine-mui'
import { PersistGate } from 'redux-persist/lib/integration/react'
import theme from '@styles/default'
import '@styles/base/_base.scss'
import '@styles/default'
import '@styles/app.scss'
import '@styles/theme'
import './style.css'
import '../src/styles/app.scss'
import Head from "next/head";

import { store, persistor } from 'src/store/'

//telas do paciente
import Login from './patient/login'
import returnRoute from '../src/components/routes'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx,
  }: AppContext): Promise<AppInitialProps> {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    // const store = configureStore()
    const { ["userRole"]: role } = parseCookies();

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MemedProvider>
            {/* <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} /> */}

            <PersistGate loading={null} persistor={persistor}>
              <RefineSnackbarProvider>
                <Refine
                  routerProvider={routerProvider}
                  notificationProvider={notificationProvider}
                  catchAll={<ErrorComponent />}
                  dataProvider={dataProvider("")}
                  resources={returnRoute(role)}
                  authProvider={authProvider}
                  Title={Title}
                  Sider={Sider}
                  Layout={Layout}
                  Header={Header}
                  LoginPage={Login}
                >
                  <Head>
                    <title>Hausey | Portal</title>
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1.0"
                    />
                  </Head>
                  <Component {...pageProps} />
                </Refine>
              </RefineSnackbarProvider>
            </PersistGate>
          </MemedProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default MyApp
