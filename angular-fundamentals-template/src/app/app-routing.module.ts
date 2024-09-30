import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/modules/login.module').then(m => m.LoginModule)
    },
    {
        path: 'registration',
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('./shared/components/modules/registration.module').then(m => m.RegistrationModule),
    },
    {
        path: 'courses',
        canActivate: [AuthorizedGuard],
        loadChildren: () => import('./shared/components/modules/courses.module').then(m => m.CoursesModule),
    },
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: '/login',
    },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoute{

}