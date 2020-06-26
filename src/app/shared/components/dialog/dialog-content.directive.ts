import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { Dialog } from './dialog';
import { DialogRef } from './dialog-ref';

/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: '[ce-dialog-close], [ceDialogClose]',
  exportAs: 'ceDialogClose',
  host: {
    '(click)': 'dialogRef.close(dialogResult)',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.type]': 'type',
  },
})
export class DialogCloseDirective implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Default to "button" to prevents accidental form submits. */
  @Input() type: 'submit' | 'button' | 'reset' = 'button';

  /** Dialog close input. */
  @Input('ce-dialog-close') dialogResult: any;

  @Input('ceDialogClose') _ceDialogClose: any;

  constructor(
    @Optional() public dialogRef: DialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Dialog,
  ) {}

  ngOnInit() {
    if (!this.dialogRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.dialogRef = getClosestDialog(
        this._elementRef,
        this._dialog.openDialogs,
      )!;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange =
      changes['_ceDialogClose'] || changes['_ceDialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[ce-dialog-title], [ceDialogTitle]',
  exportAs: 'ceDialogTitle',
  host: {
    class: 'ce-dialog-title',
    '[id]': 'id',
  },
})
export class DialogTitleDirective implements OnInit {
  @Input() id = `ce-dialog-title-${dialogElementUid++}`;

  constructor(
    @Optional() private _dialogRef: DialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Dialog,
  ) {}

  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(
        this._elementRef,
        this._dialog.openDialogs,
      )!;
    }

    if (this._dialogRef) {
      Promise.resolve().then(() => {
        const container = this._dialogRef._containerInstance;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}

/**
 * Scrollable content container of a dialog.
 */
@Directive({
  selector: `[ce-dialog-content], ce-dialog-content, [ceDialogContent]`,
  host: { class: 'ce-dialog-content' },
})
export class DialogContentDirective {}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[ce-dialog-actions], ce-dialog-actions, [ceDialogActions]`,
  host: { class: 'ce-dialog-actions' },
})
export class DialogActionsDirective {}

/**
 * Finds the closest DialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(
  element: ElementRef<HTMLElement>,
  openDialogs: DialogRef<any>[],
) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('ce-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}
