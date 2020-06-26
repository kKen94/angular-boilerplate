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
  selector: '[app-dialog-close], [appDialogClose]',
  exportAs: 'appDialogClose',
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
  @Input('app-dialog-close') dialogResult: any;

  @Input('appDialogClose') _appDialogClose: any;

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
      changes['_appDialogClose'] || changes['_appDialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[app-dialog-title], [appDialogTitle]',
  exportAs: 'appDialogTitle',
  host: {
    class: 'app-dialog-title',
    '[id]': 'id',
  },
})
export class DialogTitleDirective implements OnInit {
  @Input() id = `app-dialog-title-${dialogElementUid++}`;

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
  selector: `[app-dialog-content], app-dialog-content, [appDialogContent]`,
  host: { class: 'app-dialog-content' },
})
export class DialogContentDirective {}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[app-dialog-actions], app-dialog-actions, [appDialogActions]`,
  host: { class: 'app-dialog-actions' },
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

  while (parent && !parent.classList.contains('app-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}
