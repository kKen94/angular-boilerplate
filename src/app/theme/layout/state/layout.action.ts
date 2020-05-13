// tslint:disable-next-line:no-namespace
export namespace QuickPanel {
  export class Open {
    static readonly type = '[Layout] OpenPanel quick panel';
  }

  export class Close {
    static readonly type = '[Layout] ClosePanel quick panel';
  }
}

// tslint:disable-next-line:no-namespace
export namespace Menu {
  export class Open {
    static readonly type = '[Layout] OpenPanel menu';
  }

  export class Close {
    static readonly type = '[Layout] ClosePanel menu';
  }
}

export class TogglePinMenu {
  static readonly type = '[Layout] Toggle pin menu';
  constructor(public open?: boolean) {}
}
