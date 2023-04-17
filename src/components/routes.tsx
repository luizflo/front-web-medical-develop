import React, { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
//telas do paciente
import login from '../../pages/patient/login'
import homePage from '../../pages/patient/homePage'
import historic from "../../pages/patient/historic";

//telas da secretária
import Professionals from "../../pages/secretary/professionals";
import Details from "../../pages/secretary/professionals/Steps/Details";
import programs from "../../pages/secretary/planos";
import Patients from "../../pages/secretary/patients";
import Agenda from "./secretary/agenda";

//telas do médico
import Home from "../../pages/doctor/home";
import AgendaDoctor from "./doctor/agenda";
import PatientsDoctor from "../../pages/doctor/patients";
import HistoricDoctor from "../../pages/doctor/history";

//Ícones
import IconHome from "../../public/images/menu/homeDisable.svg";
import IconHome2 from "../../public/images/menu/homeSelected.svg";
import IconPlans from "../../public/images/menu/plans.svg";
import IconProgram from "../../public/images/menu/programsSelected.svg";
import IconProgramDisabled from "../../public/images/menu/programsDisable.svg";
import IconExams from "../../public/images/menu/exams.svg";
import HistoricIcon from "../../public/images/menu/historicSelected.svg";
import HistoricIconDisable from "../../public/images/menu/historicDisable.svg";
import ExamsIcon from "../../public/images/menu/examsSelected.svg";
import ExamsIconDisable from "../../public/images/menu/examsDisabled.svg";
import MyHourIcon from "../../public/images/menu/myHoursDisable.svg";
import MyHourIconSelected from "../../public/images/menu/myHoursSelected.svg";
import QuestIcon from "../../public/images/menu/questionariesSelected.svg";
import QuestIconDisable from "../../public/images/menu/questionariesDisable.svg";
import PatientsIcon from "../../public/images/menu/patientsSelected.svg";
import PatientsIconDisable from "../../public/images/menu/patientsDisable.svg";
import ProfessionalIcon from "../../public/images/menu/professionalSelected.svg";
import ProfessionalIconDisable from "../../public/images/menu/professionalDisable.svg";
import IconPatient from "../../public/images/menu/patient.svg";
import IconDoctor from "../../public/images/menu/doctor.svg";
import IconAgenda from "../../public/images/menu/calendar.svg";
import IconAgendaSelected from "../../public/images/menu/calendarSelected.svg";

import HomeSecretary from "../../pages/secretary/home";
import { AppState } from "src/store";
import { UserState } from "src/store/user/types";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { parseCookies } from "nookies";
import {
  ResourceProps,
  useAuthenticated,
  useNavigation,
} from "@pankod/refine-core";

interface RoutesProps extends ResourceProps {
  icon: ReactNode[];
}

export default function returnRoute(roleUser: any) {
  const { ["userRole"]: role } = parseCookies();
  const routesApp: RoutesProps[] = [
    // rotas do paciente
    {
      name: "home",
      options: {
        label: "Home",
        hide: roleUser === "patient" ? false : true,
      },
      list: homePage,
      icon: [<IconHome />, <IconHome2 />],
    },
    {
      name: "history",
      options: {
        label: "Meu histórico",
        hide: roleUser === "patient" ? false : true,
      },
      list: historic,
      icon: [<HistoricIconDisable />, <HistoricIcon />],
    },
    // {
    //   name: 'exams',
    //   options: {
    //     label: 'Meus exames',
    //     hide: roleUser === 'patient' ? false : true,
    //   },
    //   list: myExams,
    //   icon: [<ExamsIconDisable />, <ExamsIcon />],
    // },
    //rotas do profissional
    {
      name: "home-doctor",
      options: {
        label: "Home",
        hide: roleUser === "professional" ? false : true,
      },
      list: Home,
      icon: [<IconHome />, <IconHome2 />],
    },
    {
      name: "history-doctor",
      options: {
        label: "Histórico de consultas",
        hide: roleUser === "professional" ? false : true,
      },
      list: HistoricDoctor,
      icon: [<HistoricIconDisable />, <HistoricIcon />],
    },
    // {
    //   name: 'agenda-doctor',
    //   options: {
    //     label: 'Minha escala',
    //     hide: roleUser === 'professional' ? false : true,
    //   },
    //   list: AgendaDoctor,
    //   icon: [<MyHourIcon />, <MyHourIconSelected />],
    // },
    {
      name: "pacientes-doctor",
      options: {
        label: "Meus pacientes",
        hide: roleUser === "professional" ? false : true,
      },
      list: PatientsDoctor,
      icon: [<PatientsIconDisable />, <PatientsIcon />],
    },
    //rotas da secretária
    {
      name: "home-manager",
      options: {
        label: "Home",
        hide: roleUser === "manager" ? false : true,
      },
      list: HomeSecretary,
      icon: [<IconHome />, <IconHome2 />],
    },
    // {
    //   name: 'Agenda',
    //   list: agenda,
    //   icon: <Image alt="no-alt" src={IconAgenda} />,
    // },
    // {
    //   name: 'agenda-manager',
    //   options: {
    //     label: 'Agenda',
    //     hide: roleUser === 'manager' ? false : true,
    //   },
    //   list: Agenda,
    //   icon: [<IconAgenda />, <IconAgendaSelected />],
    // },
    {
      name: "profissionais-manager",
      options: {
        label: "Profissionais",
        hide: roleUser === "manager" ? false : true,
      },
      list: Professionals,
      icon: [<ProfessionalIconDisable />, <ProfessionalIcon />],
    },
    {
      name: "pacientes-manager",
      options: {
        label: "Pacientes",
        hide: roleUser === "manager" ? false : true,
      },
      list: Patients,
      icon: [<PatientsIconDisable />, <PatientsIcon />],
    },
    // {
    //   name: 'planos-manager',
    //   options: {
    //     label: 'Planos',
    //     hide: roleUser === 'manager' ? false : true,
    //   },
    //   list: programs,
    //   icon: [<HistoricIconDisable />, <HistoricIcon />],
    // },
  ];

  return routesApp;
}
