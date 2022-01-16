import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { JobsCreateComponent } from './jobs/jobs-create/jobs-create.component'
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent,
  },
  {
    path: 'create',
    component: JobsCreateComponent,
  },
  {
    path: 'edit/:id',
    component: JobsCreateComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
