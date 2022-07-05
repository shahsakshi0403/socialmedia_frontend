import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'login',
    loadComponent: async () => (await (await import('./login.component')).AuthComponent),
  },
];