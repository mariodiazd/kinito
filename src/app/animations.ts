import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const ShakeAnimation = [
	style({ transform: 'rotate(0)' }),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(-2deg)' })),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(0)' })),
];
export const QueryShake = [
	trigger('queryShake', [
		transition('* => default', [query('.card', ShakeAnimation)]),
	]),
];

export const FadeAnimation = trigger('fadeSlideInOut', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(10px)' }),
		animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
	transition(':leave', [
		animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
	]),
]);

export const EnterExitLeft = [
  trigger('enterExitLeft', [
      transition(':enter', [
          style({ opacity: 0, transform: 'translateX(-200px)' }),
          animate(
              '300ms ease-in',
              style({ opacity: 1, transform: 'translateX(0)' })
          ),
    ]),
    transition(':leave', [
          animate(
              '300ms ease-in',
              style({ opacity: 0, transform: 'translateX(-200px)' })
          ),
    ]),
  ]),
];
export const EnterExitRight = [
  trigger('enterExitRight', [
      transition(':enter', [
          style({ opacity: 0, transform: 'translateX(200px)' }),
          animate(
              '300ms ease-in',
              style({ opacity: 1, transform: 'translateX(0)' })
          ),
      ]),
      transition(':leave', [
          animate(
              '300ms ease-in',
              style({ opacity: 0, transform: 'translateX(200px)' })
        ),
      ]),
]),
];

const resetRoute = [
  style({ position: 'relative' }),
  query(
      ':enter, :leave',
    [
        style({
              position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
              top: 0, // adjust this if you have a header so it factors in the height and not cause the router outlet to jump as it animates
              left: 0,
              width: '100%',
              opacity: 0,
          }),
    ],
    { optional: true }
  ),
];

// Fade Animation
export const routeFadeAnimation = trigger('routeFadeAnimation', [
  transition('* => *', [
      ...resetRoute,
      query(':enter', [style({ opacity: 0 })], {
        optional: true,
      }),
      group([
          query(
              ':leave',
              [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
              { optional: true }
          ),
          query(
              ':enter',
              [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
              { optional: true }
          ),
      ]),
  ]),
]);
