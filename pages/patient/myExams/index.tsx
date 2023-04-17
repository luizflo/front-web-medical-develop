import React, { useEffect } from 'react'
import styles from './myExams.module.scss'
import { useRouter } from 'next/router'
import { alpha, Box, Grid, InputBase, styled, Typography } from '@mui/material'
import {
  DataGrid,
  GridColumns,
  GridToolbar,
  useDataGrid,
} from '@pankod/refine-mui'
import { IExams } from 'src/interfaces'
import SearchIcon from '@mui/icons-material/Search'

export default function myExams() {
  const router = useRouter()
  const myExams: IExams[] = [
    {
      id: 0,
      name: 'Eletrocardiograma',
      fileName: 'eletro.pdf',
      fileLink:
        'https://programacentelha.com.br/wp-content/uploads/2022/09/CE-Edital-Centelha-2-1a-Prorrogacao.pdf',
      date: '03 de abril de 2022 às 10:05',
      addedIn: '10 de abril de 2022 às 10:05',
      size: '1,9MB',
    },
    {
      id: 1,
      name: 'Exame de sangue',
      fileName: 'asdasdafffsd.pdf',
      fileLink:
        'https://programacentelha.com.br/wp-content/uploads/2022/09/CE-Edital-Centelha-2-1a-Prorrogacao.pdf',
      date: '20 de abril de 2022 às 10:05',
      addedIn: '10 de abril de 2022 às 10:05',
      size: '1,5MB',
    },
    {
      id: 2,
      name: 'Raio X',
      fileName: 'eletro.pdf',
      fileLink:
        'https://programacentelha.com.br/wp-content/uploads/2022/09/CE-Edital-Centelha-2-1a-Prorrogacao.pdf',
      date: '25 de abril de 2022 às 10:05',
      addedIn: '10 de abril de 2022 às 10:05',
      size: '2,4MB',
    },
  ]

  const columns = React.useMemo<GridColumns<IExams>>(
    () => [
      {
        field: 'name',
        headerName: 'Descrição',
        minWidth: 250,
        headerClassName: styles.headerMenu,
        cellClassName: styles.cellName,
      },
      {
        field: 'fileName',
        headerName: 'Arquivo',
        flex: 1,
        headerClassName: styles.headerMenu,
        cellClassName: styles.cell,
      },
      {
        field: 'date',
        headerName: 'Realizado em',
        flex: 1,
        headerClassName: styles.headerMenu,
        cellClassName: styles.cell,
      },
      {
        field: 'addedIn',
        headerName: 'Adicionado em',
        flex: 1,
        headerClassName: styles.headerMenu,
        cellClassName: styles.cell,
      },
      {
        field: 'size',
        headerName: 'Tamanho',
        flex: 1,
        headerClassName: styles.headerMenu,
        cellClassName: styles.cell,
      },
    ],
    [],
  )
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }))
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  return (
    <Grid className={styles.container}>
      <Grid>
        <Typography className={styles.title}>Meus Exames</Typography>
        <Typography className={styles.subtitle}>
          Aqui você tem acesso ao seu arquivo de exames
        </Typography>
      </Grid>

      <div className={styles.hr}></div>
      <Grid className={styles.rowSpace}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon className={styles.iconSearch} />
          </SearchIconWrapper>
          <InputBase
            className={styles.styledInputBase}
            placeholder="Pesquisar exame"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Grid className={styles.end}>
          <a className={styles.buttonBlue} onClick={() => {}}>
            <Typography variant="body1" className={styles.textButtonConfirm}>
              Adicionar arquivos
            </Typography>
          </a>
          <Typography className={styles.observation}>
            Tamanho máximo permitido: 2MB
          </Typography>
          <Typography className={styles.observation}>
            Extensões de arquivos suportados: PNG, pdf e JPG.
          </Typography>
        </Grid>
      </Grid>

      <DataGrid
        className={styles.grid}
        rows={myExams}
        hideFooter
        columns={columns}
        autoHeight
      />
    </Grid>
  )
}
