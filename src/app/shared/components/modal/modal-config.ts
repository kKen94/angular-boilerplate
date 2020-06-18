export const ModalConfig = {
  bodyClassOpen: 'dialog-open',
  prefixEvent: 'ce-modal.',
};

export interface IModalOptions {
  closable?: boolean;
  escapable?: boolean;
  dismissable?: boolean;
  customClass?: string;
  backdrop?: boolean;
  force?: boolean;
  hideDelay?: number;
  autostart?: boolean;
  target?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  refocus?: boolean;
}
