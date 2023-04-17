// @ts-nocheck
import {
  TextareaAutosize,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import React from 'react'
import styles from './styles.module.scss'
import { IAnamneseWindowProps } from "src/interfaces";

// In this component, we are toggling the visibility of the ChatWindow with CSS instead of
// conditionally rendering the component in the DOM. This is done so that the ChatWindow is
// not unmounted while a file upload is in progress.

export default function AnamneseWindow({
  anamneseInput,
  postAnamneseText,
  onChangeTextFieldAnamnese,
  isAnamneseLoading,
  saveButtonDisabledAnamnese,
}: IAnamneseWindowProps) {
  // const { isChatWindowOpen, messages, conversation } = useChatContext()

  return (
    <aside className={styles.chatWindowContainer}>
      <Typography
        variant="h2"
        fontWeight={"medium"}
        className={styles.windowTitle}
      >
        Anamnese
      </Typography>
      <Typography variant="body2" className={styles.windowSubtitle}>
        Atendimento #
      </Typography>
      <TextareaAutosize
        minRows={5}
        value={anamneseInput}
        placeholder="Escreva aqui as anotações da consulta"
        onChange={onChangeTextFieldAnamnese}
        className={styles.textArea}
      />
      <Button
        variant="contained"
        disabled={saveButtonDisabledAnamnese}
        className={styles.buttonSave}
        onClick={() => postAnamneseText()}
      >
        {isAnamneseLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Salvar"
        )}
      </Button>
    </aside>
  );
}
