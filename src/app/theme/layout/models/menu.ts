import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export interface Menu {
  // code: string;
  displayedName: string;
  routerLink: string;
  // children?: Menu[];
  icon: IconDefinition;
}
