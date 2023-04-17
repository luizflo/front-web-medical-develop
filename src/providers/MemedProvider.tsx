import React from "react";

import { PacientInterface, WorkplaceInterface } from "src/interfaces/pacient";
import { ModuleOptions } from "../memedDomain";
import {
  useScriptLoader,
  useSetupCommands,
  useSetupPatient,
  useActionButtonBind,
} from "../hooks";
import MemedContext from "../contexts/MemedContext";
import { getMemedURL } from "../utils/getMemedUrl";

import { cleanUp, showPrescription, hidePrescription } from "../memedActions";
import { colors } from "@styles/theme";

interface MemedContextProviderProps {
  children: React.ReactNode;
  color?: string;
  scriptSrc?: string;
  scriptId?: string;
}

export default function MemedProvider(
  props: MemedContextProviderProps
): React.ReactElement {
  const {
    children,
    color = colors.primary[80],
    scriptSrc = `https://${getMemedURL()}/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js`,
    scriptId = "memedScript",
  } = props;

  const [doctorToken, setDoctorToken] = React.useState("");
  const [patient, setPatient] = React.useState<PacientInterface>();
  const [workplace, setWorkplace] = React.useState<WorkplaceInterface>();
  const [actionRef, setActionRef] =
    React.useState<React.RefObject<HTMLButtonElement>>();
  const [options, setOptions] = React.useState<ModuleOptions>();

  const { prescriptionLoaded } = useScriptLoader({
    doctorToken,
    color,
    scriptSrc,
    scriptId,
  });
  React.useEffect(() => {}, [doctorToken]);

  const { patientSet } = useSetupPatient({ patient, prescriptionLoaded });

  useSetupCommands({ options, prescriptionLoaded });

  const onLogout = React.useCallback(() => {
    if (prescriptionLoaded) {
      cleanUp(scriptId);
    }
  }, [scriptId, prescriptionLoaded]);

  const loadingModule = React.useMemo(
    () => !prescriptionLoaded || !patientSet,
    [prescriptionLoaded, patientSet]
  );

  const contextValue = React.useMemo(
    () => ({
      setDoctorToken,
      setPatient,
      setActionRef,
      onLogout,
      loadingModule,
      showPrescription,
      hidePrescription,
      setOptions,
    }),
    [onLogout, loadingModule]
  );

  return (
    <MemedContext.Provider value={contextValue}>
      {children}
    </MemedContext.Provider>
  );
}
