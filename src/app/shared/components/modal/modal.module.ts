import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalStackService } from './modal-stack.service';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class ModalModule {
  /**
   * Use in AppModule: new instance of NgxSmartModal.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [ModalService, ModalStackService],
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of NgxSmartModal.
   */
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [ModalService, ModalStackService],
    };
  }

  constructor(private service: ModalService) {}
}
