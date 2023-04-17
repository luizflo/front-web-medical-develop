import { PacientInterface } from "../interfaces/pacient";
import { Module } from "./Module";

export interface MdHub {
  server: {
    unbindEvents: () => void;
  };
  command: {
    send: (
      moduleName: string,
      action: string,
      payload?: PacientInterface | unknown
    ) => Promise<void>;
    deletePatient: unknown | boolean;
    removePatient: unknown | boolean;
    editPatient: unknown | boolean;
  };
  module: Module;
  event: {
    add(name: string, handler: (...args: unknown[]) => void): void;
  };
}
