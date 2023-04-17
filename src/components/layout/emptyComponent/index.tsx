import React, { useContext } from 'react'
import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './empty.module.scss'
import { formatDate } from '@components/utils'

import ListEmptyIcon from 'public/EmptyInbox.png'
import NoDocuments from 'public/NoDocuments.png'

interface EmptyProps {
  update: () => void
  isLoading: boolean
  type?: string
  title: string
  message: string
}
export default function EmptyComponent({
  isLoading,
  update,
  type,
  title,
  message,
}: EmptyProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 500,
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Image
        alt="no-alt"
        src={type === "files" ? NoDocuments : ListEmptyIcon}
        width={250}
        height={200}
      />
      <Typography
        variant="h3"
        fontWeight={"medium"}
        style={{ padding: "0px 30px", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        fontWeight={"light"}
        style={{ padding: "0px 30px", textAlign: "center" }}
        className={styles.subtitleEmpty}
      >
        {message}
      </Typography>
      <Button variant="text" sx={{ fontSize: "12px" }} onClick={() => update()}>
        {isLoading ? (
          <CircularProgress color="inherit" size={15} />
        ) : (
          "Atualizar"
        )}
      </Button>
    </Box>
  );
}
