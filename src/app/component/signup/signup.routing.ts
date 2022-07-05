import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'signup',
    loadComponent: async () => (await (await import('./signup.component')).SignUpComponent),
  },
];