import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  Type,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { ModalConfig } from './modal-config';

@Component({
  selector: 'ce-modal',
  templateUrl: './modal.component.html',
  styles: [``],
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  faTimes = faTimes;
  @Input() public closable = true;
  @Input() public escapable = true;
  @Input() public dismissable = true;
  @Input() public identifier = '';
  @Input() public customClass = 'ce-dialog-animation-fade';
  @Input() public visible = false;
  @Input() public backdrop = true;
  @Input() public force = true;
  @Input() public hideDelay = 500;
  @Input() public autostart = false;
  @Input() public target = '';
  @Input() public ariaLabel: string | null = null;
  @Input() public ariaLabelledBy: string | null = null;
  @Input() public ariaDescribedBy: string | null = null;
  @Input() public refocus = true;

  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onCloseFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onDismiss: EventEmitter<any> = new EventEmitter();
  @Output() public onDismissFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() public onAnyCloseEventFinished: EventEmitter<
    any
  > = new EventEmitter();
  @Output() public onOpen: EventEmitter<any> = new EventEmitter();
  @Output() public onOpenFinished: EventEmitter<any> = new EventEmitter();
  @Output() public onEscape: EventEmitter<any> = new EventEmitter();
  @Output() public onDataAdded: EventEmitter<any> = new EventEmitter();
  @Output() public onDataRemoved: EventEmitter<any> = new EventEmitter();

  public contentComponent: Type<Component>;
  public layerPosition = 1041;
  public overlayVisible = false;
  public openedClass = false;

  public createFrom = 'html';

  private _data: any;

  @ViewChildren('ceContent') private ceContent: QueryList<ElementRef>;
  @ViewChildren('ceDialog') public ceDialog: QueryList<ElementRef>;
  @ViewChildren('ceOverlay') private ceOverlay: QueryList<ElementRef>;
  @ViewChildren('dynamicContent', { read: ViewContainerRef })
  dynamicContentContainer: QueryList<ViewContainerRef>;

  constructor(
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: any,
    @Inject(PLATFORM_ID) private _platformId: any,
  ) {}

  public ngOnInit(): void {
    if (!this.identifier || !this.identifier.length) {
      throw new Error(
        'identifier field isn’t set. Please set one before calling <ce-modal> in a template.',
      );
    }

    this._sendEvent('create');
  }

  public ngAfterViewInit(): void {
    if (this.contentComponent) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        this.contentComponent,
      );
      this.createDynamicContent(this.dynamicContentContainer, factory);
      this.dynamicContentContainer.changes.subscribe(
        (contentViewContainers: QueryList<ViewContainerRef>) => {
          this.createDynamicContent(contentViewContainers, factory);
        },
      );
    }
  }

  public ngOnDestroy(): void {
    this._sendEvent('delete');
  }

  /**
   * Open the modal instance
   *
   * @param top open the modal top of all other
   * @returns the modal component
   */
  public open(top?: boolean): ModalComponent {
    this._sendEvent('open', { top });

    return this;
  }

  /**
   * Close the modal instance
   *
   * @returns the modal component
   */
  public close(): ModalComponent {
    this._sendEvent('close');

    return this;
  }

  /**
   * Dismiss the modal instance
   *
   * @param e the event sent by the browser
   * @returns the modal component
   */
  public dismiss(e: any): ModalComponent {
    if (!this.dismissable || !e.target.classList.contains('modal-overlay')) {
      return this;
    }

    this._sendEvent('dismiss');

    return this;
  }

  /**
   * Toggle visibility of the modal instance
   *
   * @param top open the modal top of all other
   * @returns the modal component
   */
  public toggle(top?: boolean): ModalComponent {
    this._sendEvent('toggle', { top });

    return this;
  }

  /**
   * Add a custom class to the modal instance
   *
   * @param className the class to add
   * @returns the modal component
   */
  public addCustomClass(className: string): ModalComponent {
    if (!this.customClass.length) {
      this.customClass = className;
    } else {
      this.customClass += ' ' + className;
    }

    return this;
  }

  /**
   * Remove a custom class to the modal instance
   *
   * @param className the class to remove
   * @returns the modal component
   */
  public removeCustomClass(className?: string): ModalComponent {
    if (className) {
      this.customClass = this.customClass.replace(className, '').trim();
    } else {
      this.customClass = '';
    }

    return this;
  }

  /**
   * Returns the visibility state of the modal instance
   */
  public isVisible(): boolean {
    return this.visible;
  }

  /**
   * Checks if data is attached to the modal instance
   */
  public hasData(): boolean {
    return this._data !== undefined;
  }

  /**
   * Attach data to the modal instance
   *
   * @param data the data to attach
   * @param force override potentially attached data
   * @returns the modal component
   */
  public setData(data: any, force?: boolean): ModalComponent {
    if (!this.hasData() || (this.hasData() && force)) {
      this._data = data;
      this.onDataAdded.emit(this._data);
      this.markForCheck();
    }

    return this;
  }

  /**
   * Retrieve the data attached to the modal instance
   */
  public getData(): any {
    return this._data;
  }

  /**
   * Remove the data attached to the modal instance
   *
   * @returns the modal component
   */
  public removeData(): ModalComponent {
    this._data = undefined;
    this.onDataRemoved.emit(true);
    this.markForCheck();

    return this;
  }

  /**
   * Add body class modal opened
   *
   * @returns the modal component
   */
  public addBodyClass(): ModalComponent {
    this._renderer.addClass(this._document.body, ModalConfig.bodyClassOpen);

    return this;
  }

  /**
   * Add body class modal opened
   *
   * @returns the modal component
   */
  public removeBodyClass(): ModalComponent {
    this._renderer.removeClass(this._document.body, ModalConfig.bodyClassOpen);

    return this;
  }

  public markForCheck() {
    try {
      this._changeDetectorRef.detectChanges();
    } catch (e) {}

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Listens for window resize event and recalculates modal instance position if it is element-relative
   */
  @HostListener('window:resize')
  public targetPlacement(): boolean | void {
    if (
      !this.isBrowser ||
      !this.ceDialog.length ||
      !this.ceContent.length ||
      !this.ceOverlay.length ||
      !this.target
    ) {
      return false;
    }
    const targetElement = this._document.querySelector(this.target);

    if (!targetElement) {
      return false;
    }

    const targetElementRect = targetElement.getBoundingClientRect();
    const bodyRect = this.ceOverlay.first.nativeElement.getBoundingClientRect();

    const ceContentRect = this.ceContent.first.nativeElement.getBoundingClientRect();
    const ceDialogRect = this.ceDialog.first.nativeElement.getBoundingClientRect();

    const marginLeft = parseInt(
      getComputedStyle(this.ceContent.first.nativeElement).marginLeft as any,
      10,
    );
    const marginTop = parseInt(
      getComputedStyle(this.ceContent.first.nativeElement).marginTop as any,
      10,
    );

    let offsetTop =
      targetElementRect.top -
      ceDialogRect.top -
      (ceContentRect.height - targetElementRect.height) / 2;
    let offsetLeft =
      targetElementRect.left -
      ceDialogRect.left -
      (ceContentRect.width - targetElementRect.width) / 2;

    if (
      offsetLeft + ceDialogRect.left + ceContentRect.width + marginLeft * 2 >
      bodyRect.width
    ) {
      offsetLeft =
        bodyRect.width -
        (ceDialogRect.left + ceContentRect.width) -
        marginLeft * 2;
    } else if (offsetLeft + ceDialogRect.left < 0) {
      offsetLeft = -ceDialogRect.left;
    }

    if (
      offsetTop + ceDialogRect.top + ceContentRect.height + marginTop >
      bodyRect.height
    ) {
      offsetTop =
        bodyRect.height - (ceDialogRect.top + ceContentRect.height) - marginTop;
    }

    this._renderer.setStyle(
      this.ceContent.first.nativeElement,
      'top',
      (offsetTop < 0 ? 0 : offsetTop) + 'px',
    );
    this._renderer.setStyle(
      this.ceContent.first.nativeElement,
      'left',
      offsetLeft + 'px',
    );
  }

  private _sendEvent(name: string, extraData?: any): boolean {
    if (!this.isBrowser) {
      return false;
    }

    const data = {
      extraData,
      instance: { id: this.identifier, modal: this },
    };

    const event = new CustomEvent(ModalConfig.prefixEvent + name, {
      detail: data,
    });

    return window.dispatchEvent(event);
  }

  /**
   * Is current platform browser
   */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  /**
   * Creates content inside provided ViewContainerRef
   */
  private createDynamicContent(
    changes: QueryList<ViewContainerRef>,
    factory: ComponentFactory<Component>,
  ): void {
    changes.forEach((viewContainerRef: ViewContainerRef) => {
      viewContainerRef.clear();
      viewContainerRef.createComponent(factory);
      this.markForCheck();
    });
  }
}
