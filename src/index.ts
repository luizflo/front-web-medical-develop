import { MdHub, MdSinapsePrescricao } from "./memedDomain";
declare global {
  interface Window {
    MdHub: MdHub;
    MdSinapsePrescricao: MdSinapsePrescricao;
  }
}

export * from "./memedDomain";
export { useMemed } from "./hooks";
export { default } from "./providers/MemedProvider";
