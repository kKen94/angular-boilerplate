export type CePopoverScrollStrategy = 'noop' | 'block' | 'reposition' | 'close';
export const VALID_SCROLL: CePopoverScrollStrategy[] = [
  'noop',
  'block',
  'reposition',
  'close',
];

export type CePopoverHorizontalAlign =
  | 'before'
  | 'start'
  | 'center'
  | 'end'
  | 'after';
export const VALID_HORIZ_ALIGN: CePopoverHorizontalAlign[] = [
  'before',
  'start',
  'center',
  'end',
  'after',
];

export type CePopoverVerticalAlign =
  | 'above'
  | 'start'
  | 'center'
  | 'end'
  | 'below';
export const VALID_VERT_ALIGN: CePopoverVerticalAlign[] = [
  'above',
  'start',
  'center',
  'end',
  'below',
];

export interface CePopoverOpenOptions {
  /**
   * Whether the popover should return focus to the previously focused element after
   * closing. Defaults to true.
   */
  restoreFocus?: boolean;

  /** Whether the first focusable element should be focused on open. Defaults to true. */
  autoFocus?: boolean;
}
