import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'header',
    loadComponent: async () => (await (await import('./header.component')).HeaderComponent),
  },
];