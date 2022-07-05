import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'user',
    loadComponent: async () => (await (await import('./user.component')).UserComponent),
  },
];