namespace MdHub {
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

declare namespace MdSinapsePrescricao {
  let initialized: boolean;

  export function init(options: any): void;

  export namespace command {
    function send(
      module: string,
      commandName: string,
      data?: any
    ): Promise<any>;
  }

  export namespace event {
    function add(eventName: string, callback: (data: any) => void): void;
    function trigger(eventName: string, data?: any): void;
    function remove(eventName: string): void;
  }

  export module module {
    function hide(moduleName: string): void;
    function show(moduleName: string): void;
  }
}
