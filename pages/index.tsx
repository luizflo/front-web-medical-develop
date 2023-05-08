import React from 'react'
import LoginPage from './patient/login'
import Loading from './loading'
import CreateAccount from "./patient/createAccount";

export default function App() {
  return (
    <React.StrictMode>
      <CreateAccount />
    </React.StrictMode>
  );
}
