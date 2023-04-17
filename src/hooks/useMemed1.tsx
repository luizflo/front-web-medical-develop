/* eslint-disable no-console */
import { createContext, ReactNode, useContext } from "react";
import { PacientInterface } from "../interfaces/pacient";
import { colors } from "../styles/theme";

import { getMemedURL } from "../utils/getMemedUrl";

interface MemedContextProps {
  logOut: () => void;
  open: () => void;
  initMemed: (token: string) => void;
  definePacient: (pacient: PacientInterface) => Promise<any>;
}

interface Props {
  children: ReactNode;
}

declare namespace IMdHub {
  let initialized: boolean;

  export function init(options: any): void;

  export namespace command {
    function send(
      module: string,
      commandName: string,
      data?: any
    ): Promise<any>;
  }

  export module event {
    function add(eventName: string, callback: (data: any) => void): void;
    function trigger(eventName: string, data?: any): void;
    function remove(eventName: string): void;
  }

  export module server {
    function unbindEvents(): void;
  }

  export module module {
    function hide(moduleName: string): void;
    function show(moduleName: string): void;
  }

  export module optionsCustom {
    const global: {
      fullscreen: boolean;
    };
  }
}
declare namespace IMdSinapsePrescricao {
  let initialized: boolean;

  export function init(options: any): void;

  export namespace command {
    export function send(
      module: string,
      commandName: string,
      data?: any
    ): Promise<any>;
  }

  export namespace event {
    export function add(eventName: string, callback: (data: any) => void): void;
    export function trigger(eventName: string, data?: any): void;
    export function remove(eventName: string): void;
  }

  export namespace module {
    export function hide(moduleName: string): void;
    export function show(moduleName: string): void;
  }
}

const MemedContext = createContext({} as MemedContextProps);

function MemedProvider({ children }: Props) {
  const logOut = () => {
    try {
      //Parar os event listeners da Memed
      IMdHub.server.unbindEvents();

      // Remover os objetos principais da Memed
      // @ts-expect-error
      delete window.MdHub;
      // @ts-expect-error
      delete window.MdSinapsePrescricao;

      const scripts = Array.from(document.getElementsByTagName("script"));
      if (scripts && scripts.length > 0) {
        scripts.forEach((script) => {
          if (script.src.includes("memed.com.br"))
            script?.parentNode?.removeChild(script);
        });
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const definePacient = (pacient: PacientInterface): Promise<any> => {
    return new Promise((resolve, reject): void => {
      try {
        IMdHub.command
          .send("plataforma.prescricao", "setPaciente", {
            idExterno: pacient?.idExterno,
            nome: pacient?.nome,
            nome_social: pacient?.nome_social,
            cpf: pacient?.cpf,
            endereco: pacient?.endereco,
            cidade: pacient?.cidade,
            telefone: pacient?.telefone,
            peso: pacient?.peso,
            altura: pacient?.altura,
            nome_mae: pacient?.nome_mae,
            dificuldade_locomocao: pacient?.dificuldade_locomocao,
          })
          .then(
            (response: any) => {
              resolve("");
            },
            (error) => {
              reject(error);
            }
          );
      } catch (err: any) {
        console.error(err);
      }
    });
  };

  const initEventsMemed = () => {
    try {
      IMdSinapsePrescricao.event.add(
        "core:moduleHide",
        (module: { moduleName: string }) => {
          if (module.moduleName === "plataforma.prescricao") {
            console.info("====== Módulos da Memed encerrados ======");
          }
        }
      );

      IMdSinapsePrescricao.event.add(
        "core:moduleInit",
        (module: { name: string }) => {
          if (module.name === "plataforma.prescricao") {
            IMdHub.command.send("plataforma.prescricao", "setFeatureToggle", {
              // Desativa a opção de excluir um paciente
              deletePatient: false,
              // Desabilita a opção de remover/trocar o paciente
              removePatient: false,
              // Esconde o formulário de confirmação dos dados do paciente para receituário de controle especial
              // caso a cidade e o endereço tenham sido definidos com o comando `setPaciente`
              editPatient: true,
            });

            IMdHub.event.add("prescricaoImpressa", (prescriptionData) => {
              // No objeto "prescriptionData", é retornado as informações da prescrição gerada.
              // Implementar ações, callbacks, etc.
              console.info(
                "====== Prescrição gerada com sucesso ======",
                prescriptionData
              );
            });
          }
        }
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const initMemed = (token: string) => {
    if (token) {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("data-color", colors.primary[80]);
      script.setAttribute("data-token", token);
      script.src = `https://${getMemedURL()}/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js`;
      script.onload = () => initEventsMemed();
      document.body.appendChild(script);
    }
  };

  const open = (module = "plataforma.prescricao") => {
    IMdHub.module.show(module);
  };

  return (
    <MemedContext.Provider value={{ logOut, open, initMemed, definePacient }}>
      {children}
    </MemedContext.Provider>
  );
}

const useMemed = (): MemedContextProps => {
  const context = useContext(MemedContext);

  if (!context) {
    throw new Error("useMemed must be used within an MemedProvider");
  }

  return context;
};

export { useMemed, MemedProvider };
