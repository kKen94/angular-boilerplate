import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const navbar = trigger('navbar', [
  state('open', style({ width: '14.2857143%' })),
  state(
    'closed',
    style({
      width: '4rem',
      minWidth: '4rem',
    }),
  ),
  transition('closed => open', [animate('0.1s')]),
]);
