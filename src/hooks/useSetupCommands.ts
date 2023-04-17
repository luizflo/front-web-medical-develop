import React from "react";

import { ModuleOptions } from "../memedDomain";
import { disableSensitiveCommands, setupOptions } from "../memedActions";

interface SetupCommandsParams {
  prescriptionLoaded: boolean;
  options?: ModuleOptions;
}

export default function useSetupCommands(params: SetupCommandsParams): void {
  const { options, prescriptionLoaded } = params;

  React.useEffect(() => {
    if (prescriptionLoaded) {
      disableSensitiveCommands();
      if (options) {
        setupOptions(options);
      }
    }
  }, [options, prescriptionLoaded]);
}
