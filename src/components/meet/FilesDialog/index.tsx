import React, { useContext } from 'react'
import {
  Alert,
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Snackbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './filesdialog.module.scss'
import { formatDate } from '@components/utils'
import IconClose from '@public/images/icons/close.png'
import EmptyComponent from '@components/layout/emptyComponent'
import NoDocuments from 'public/NoDocuments.png'
import { TransitionProps } from '@mui/material/transitions'

interface FilesDialogProps {
  handleClose: () => void
  open: boolean
  filesList?: any
  isListLoading: boolean
  update: () => void
}
export default function FilesDialog({
  open,
  handleClose,
  filesList,
  isListLoading,
  update,
}: FilesDialogProps) {
  return (
    <Dialog
      open={open}
      disableRestoreFocus
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: "20px",
          marginBottom: "0px",
        }}
      >
        <DialogTitle className={styles.dialogTitle}>
          Arquivos anexados
        </DialogTitle>
        <Image
          alt="no-alt"
          src={IconClose}
          onClick={() => handleClose()}
          className={styles.close}
          style={{ cursor: "pointer" }}
        />
      </div>

      <DialogContent>
        <Typography variant="body2" className={styles.dialogBody}>
          Esses são os arquivos disponibilizados pelo paciente
        </Typography>
        <Typography
          variant="body1"
          fontWeight={"medium"}
          style={{
            cursor: "pointer",
            color: "#0074e5",
          }}
          onClick={() => update()}
        >
          Atualizar
        </Typography>
        {filesList?.length > 0 ? (
          filesList?.map((item: any) => (
            <Box className={styles.cardFiles} key={item.url}>
              <Box className={styles.centralize}>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    maxWidth: 250,
                    marginRight: "20px",
                  }}
                  className={styles.textConsult}
                >
                  {item.name}
                </Typography>
              </Box>
              <Box className={styles.centralize}>
                <a
                  className={styles.buttonBlue}
                  href={item.url}
                  target="_blank"
                >
                  <Typography variant="h4" className={styles.textButtonConfirm}>
                    Download
                  </Typography>
                </a>
              </Box>
            </Box>
          ))
        ) : (
          <EmptyComponent
            isLoading={isListLoading}
            update={update}
            type={"files"}
            title={"Ainda não há arquivos anexados"}
            message={
              "Anexe arquivos à consulta e atualize a lista no botão abaixo para vê-los aqui"
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
