import React, { useContext } from 'react'
import { useGetIdentity, useRouterContext } from '@pankod/refine-core'
import {
  AppBar,
  IconButton,
  Avatar,
  Stack,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@pankod/refine-mui'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import IconMenu from '../../../../public/images/menu/menu.svg'
import Image from 'next/image'

import { ColorModeContext } from '@contexts'
import { UserState } from 'src/store/user/types'
import { AppState } from 'src/store'
import { useSelector } from 'react-redux'
import { IUser } from 'src/interfaces'

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext)
  const { Link } = useRouterContext()
  const { locale: currentLocale, locales, pathname, query } = useRouter()

  // const { data: user } = useGetIdentity();
  // const showUserInfo = user && (user.name || user.avatar);

  const { userLogged } = useSelector<AppState, UserState>(
    (state) => state.userState,
  )

  return (
    <AppBar
      color="transparent"
      position="sticky"
      elevation={0}
      sx={{ height: '30px' }}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton> */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            {/* <Image alt="no-alt" src={IconMenu} /> */}
            {/* <Select
              disableUnderline
              defaultValue={currentLocale}
              inputProps={{ "aria-label": "Without label" }}
              variant="standard"
            >
              {[...(locales ?? [])].sort().map((lang: string) => (
                <MenuItem
                  component={Link}
                  href={{ pathname, query }}
                  locale={lang}
                  selected={currentLocale === lang}
                  key={lang}
                  defaultValue={lang}
                  value={lang}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      sx={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                      src={`/images/flags/${lang}.svg`}
                    />
                    {lang === "en" ? "English" : "German"}
                  </Stack>
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
