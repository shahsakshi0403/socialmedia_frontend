import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { PagenotfoundComponent } from "./component/pagenotfound/pagenotfound.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: async () => (await import('./component/login/login.routing')).ROUTES,
    },
    {
        path: 'signup',
        loadChildren: async () => (await import('./component/signup/signup.routing')).ROUTES,
    },
    {
        path: 'user',
        loadChildren: async () => (await import('./component/user/user.routing')).ROUTES,
    },
    {
        path: 'post',
        loadChildren: () => import('./component/posts/posts.module').then(mod => mod.PostModule)
    },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        preloadingStrategy: PreloadAllModules
    }
    )],
    exports: [RouterModule]
})

export class AppRoutingModule { }