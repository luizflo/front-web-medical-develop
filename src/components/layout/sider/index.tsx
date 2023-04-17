import React, { ReactNode, useState } from 'react'
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRefineContext,
  useRouterContext,
  useMenu,
  IResourceItem,
} from '@pankod/refine-core'
import {
  Box,
  Drawer,
  MuiList,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@pankod/refine-mui'
import {
  ListOutlined,
  Logout,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  SupportAgent,
  Person,
  PermIdentity,
} from '@mui/icons-material'
import styles from './sider.module.scss'

import { Title as DefaultTitle } from '../title'
import { useRouter } from 'next/router'
import nookies, { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useSelector } from "react-redux";
import { AppState } from "src/store";
import { AppointmentState } from "src/store/appointment/types";
import { UserState } from "src/store/user/types";

interface RoutesItem extends IResourceItem {
  icon?: ReactNode[] | ReactNode;
}
declare type ITreeMenuProps = RoutesItem & {
  children: ITreeMenuProps[];
};
declare type useMenuReturnType = {
  defaultOpenKeys: string[];
  selectedKey: string;
  menuItems: ITreeMenuProps[];
};

export const Sider: React.FC = () => {
  const router = useRouter();
  const { callOnGoing } = useSelector<AppState, AppointmentState>(
    (state) => state.appointmentState
  );
  const [collapsed, setCollapsed] = useState<any>(false);
  const [opened, setOpened] = useState<any>(false);
  const { ["userRole"]: role } = parseCookies();
  const drawerWidth = () => {
    if (collapsed) return 64;
    return "15vw";
  };

  // const t = useTranslate()
  const { Link } = useRouterContext();
  const { menuItems, selectedKey, defaultOpenKeys }: useMenuReturnType =
    useMenu();
  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: logout } = useLogout<{ redirectPath: string }>();
  const Title = useTitle();
  const { userLogged } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );

  const [open, setOpen] = useState<{ [k: string]: any }>({});
  const logoutHandler = () => {
    destroyCookie(undefined, "userToken", { path: "/" });
    nookies.destroy(undefined, "userRole", { path: "/" });
    localStorage.clear();
    logout({ redirectPath: "/login" });
  };
  React.useEffect(() => {
    setOpen((previousOpen) => {
      const previousOpenKeys: string[] = Object.keys(previousOpen);
      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);
  React.useEffect(() => {
    if (callOnGoing) {
      setOpened(false);
    } else {
      setOpened(true);
    }
  }, [callOnGoing]);
  const RenderToTitle = Title ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenuProps[], selectedKey: string) => {
    return tree.map((item: ITreeMenuProps) => {
      const { icon, label, route, name, children, parentName } = item;
      const isOpen = open[route || ""] || false;
      const title = name.charAt(0).toUpperCase() + name.slice(1);
      const isSelected = route === selectedKey;
      // const icons: Array<any> = icon
      //@ts-ignore
      const iconSelected = icon[1];
      //@ts-ignore
      const iconDisable = icon[0];
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={Link}
              href={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              sx={{
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  color: "#0074E5",
                },
                justifyContent: "center",
                paddingBlock: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: 36,
                  color: "blue",
                  fill: "red",
                }}
              >
                {isSelected
                  ? iconSelected ?? <ListOutlined />
                  : iconDisable ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label ?? title}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "12px",
                  marginBottom: "0px !important",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const drawer = (
    <MuiList
      disablePadding
      sx={{ mt: 1, color: "#848D9F", display: !callOnGoing ? "block" : "none" }}
      className={styles.heightMenu}
    >
      {renderTreeView(menuItems, selectedKey)}
      <Grid className={styles.hr}></Grid>
      <Grid>
        <Tooltip
          title="Suporte"
          placement="right"
          disableHoverListener={!collapsed}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          arrow
        >
          <a
            target="_blank"
            href={
              role === "patient"
                ? "https://api.whatsapp.com/send?phone=554396030042&text=Ol%C3%A1%2C%20preciso%20de%20ajuda!"
                : "https://api.whatsapp.com/send?phone=5543988242838&text=Ol%C3%A1%2C%20preciso%20de%20ajuda!"
            }
            className={styles.linkExternal}
          >
            <ListItemButton
              key="logout"
              sx={{ justifyContent: "center", alignSelf: "flex-end" }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: 36,
                  color: "primary.contrastText",
                }}
              >
                <SupportAgent className={styles.IconColor} />
              </ListItemIcon>
              <ListItemText
                primary="Suporte"
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "12px",
                }}
              />
            </ListItemButton>
          </a>
        </Tooltip>
        {isExistAuthentication && (
          <Tooltip
            title="Sair"
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              key="logout"
              onClick={() => logoutHandler()}
              sx={{ justifyContent: "center" }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: 36,
                  color: "primary.contrastText",
                }}
              >
                <Logout className={styles.IconColor} />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "12px",
                }}
              />
            </ListItemButton>
          </Tooltip>
        )}
      </Grid>
      {/* @ts-ignore */}
      {role === "patient" && userLogged?.planExpiresAt === null ? (
        <Box className={styles.boxPlan}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            className={styles.txtPlan}
          >
            Adquira o Plano Pro
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"regular"}
            className={styles.txtBody}
          >
            E obtenha descontos e condições exclusivas nas suas consultas por
            apenas R$10/mês
          </Typography>
          <a
            className={styles.buttonBlue}
            onClick={() => router.push("/patient/CheckoutPlans")}
          >
            <Typography variant="body1" className={styles.textButtonConfirm}>
              Fazer upgrade
            </Typography>
          </a>
        </Box>
      ) : null}
    </MuiList>
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: "none",
            md: "block",
          },
          transition: "width 0.3s ease",
        }}
      />
      <Box
        component="nav"
        sx={{
          position: "fixed",
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: "flex",
        }}
      >
        <Drawer
          variant="temporary"
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 256,
              // bgcolor: "secondary.main",
            },
          }}
        >
          <Box className={styles.box3}>
            <RenderToTitle collapsed={false} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 1 }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            },
          }}
          open
        >
          <Box className={styles.box2}>
            <RenderToTitle collapsed={collapsed} />
          </Box>
          <Box sx={{ flexGrow: 1, overflowX: "hidden", overflowY: "auto" }}>
            {drawer}
          </Box>
        </Drawer>
        <Box
          sx={{ display: { xs: "block", md: "none" } }}
          className={styles.box}
        >
          <IconButton
            sx={{ color: "grey", width: "36px" }}
            onClick={() => setOpened((prev: any) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
