// @ts-nocheck
import {
  TextareaAutosize,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'
import { IDiagnosysWindowProps } from "src/interfaces";

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function DiagnosysWindow({
  diagnosysInput,
  postDiagnosysText,
  saveButtonDisabledDiagnosys,
  isDiagnosysLoading,
  onChangeTextFieldDiagnosys,
}: IDiagnosysWindowProps) {
  // const { isChatWindowOpen, messages, conversation } = useChatContext()

  return (
    <aside className={styles.chatWindowContainer}>
      <Typography
        variant="h2"
        fontWeight={"medium"}
        className={styles.windowTitle}
      >
        Diagnósticos primários
      </Typography>
      <Typography variant="body2" className={styles.windowSubtitle}>
        Atendimento #
      </Typography>
      <TextareaAutosize
        minRows={5}
        value={diagnosysInput}
        placeholder="Escreva aqui as anotações da consulta"
        onChange={onChangeTextFieldDiagnosys}
        className={styles.textArea}
      />
      <Button
        variant="contained"
        disabled={saveButtonDisabledDiagnosys}
        className={styles.buttonSave}
        onClick={() => postDiagnosysText()}
      >
        {isDiagnosysLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Salvar"
        )}
      </Button>
    </aside>
  );
}
