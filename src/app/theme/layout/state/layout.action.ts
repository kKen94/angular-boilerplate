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

  export class TogglePin {
    static readonly type = '[Layout] Toggle pin menu';
    constructor(public open?: boolean) {}
  }
}

// tslint:disable-next-line:no-namespace
export namespace Navbar {
  export class HoverIn {
    static readonly type = '[Layout] Hover navbar in';
  }

  export class HoverOut {
    static readonly type = '[Layout] Hover navbar out';
  }
}

export class SetMenu {
  static readonly type = '[Layout] Set menu';
  constructor(public activeUrl: string) {}
}
