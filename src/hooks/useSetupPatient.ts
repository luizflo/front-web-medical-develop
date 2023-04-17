import React from "react";

import { PacientInterface } from "src/interfaces/pacient";
import { setMemedPatient, setWorkplace } from "../memedActions";

interface SetupPatientParams {
  patient?: PacientInterface;
  prescriptionLoaded: boolean;
}

interface SetupPatientResult {
  patientSet: boolean;
}

export default function useSetupPatient(
  params: SetupPatientParams
): SetupPatientResult {
  const { patient, prescriptionLoaded } = params;

  const [patientSet, setPatientSet] = React.useState(false);

  React.useEffect(() => {
    if (patient && prescriptionLoaded) {
      setMemedPatient(patient).then(() => {
        setPatientSet(true);
        setWorkplace();
      });
    }
  }, [patient, prescriptionLoaded]);

  return { patientSet };
}
