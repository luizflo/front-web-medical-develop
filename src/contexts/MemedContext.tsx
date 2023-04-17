import React from "react";

import { PacientInterface } from "src/interfaces/pacient";
import { ModuleOptions } from "../memedDomain";

export interface MemedContextValue {
  setDoctorToken: React.Dispatch<React.SetStateAction<string>>;
  setPatient: React.Dispatch<
    React.SetStateAction<PacientInterface | undefined>
  >;
  setActionRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLButtonElement> | undefined>
  >;
  setOptions: React.Dispatch<React.SetStateAction<ModuleOptions | undefined>>;
  onLogout: (scriptId?: string) => void;
  showPrescription: () => void;
  hidePrescription: () => void;
  loadingModule: boolean;
}

const MemedContext = React.createContext<MemedContextValue | undefined>(
  undefined
);

export default MemedContext;
