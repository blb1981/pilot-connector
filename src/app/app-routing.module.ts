import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth-guard'
import { JobsCreateComponent } from './jobs/jobs-create/jobs-create.component'
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component'

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent,
  },
  {
    path: 'create',
    component: JobsCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: JobsCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
]
//TODO: Need to configure 404 route
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
