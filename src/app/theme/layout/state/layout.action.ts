export class TogglePanel {
  static readonly type = '[Layout] Toggle panel';
  constructor(public openPanel?: boolean) {}
}
