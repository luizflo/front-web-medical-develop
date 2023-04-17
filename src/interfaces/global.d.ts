export namespace MdHubb {
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

  export namespace server {
    export function unbindEvents(): void;
  }

  export namespace module {
    export function hide(moduleName: string): void;
    export function show(moduleName: string): void;
  }

  export namespace optionsCustom {
    const global: {
      fullscreen: boolean;
    };
  }
}

export namespace MdSinapsePrescricao0 {
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
