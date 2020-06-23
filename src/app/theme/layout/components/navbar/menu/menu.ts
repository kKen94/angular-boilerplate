import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { Menu } from '../../../models/menu';

export const MENU: Menu[] = [
  {
    id: 'MENU.DASHBOARD',
    displayedName: 'Dashboard',
    icon: faHome,
    routerLink: '/pages/dashboard',
    visible: true,
    showSearch: true,
  },
  {
    id: 'MENU.CALENDAR',
    displayedName: 'Calendar',
    icon: faCalendarAlt,
    routerLink: '/pages/calendar',
    showSearch: true,
    visible: true,
  },
];
