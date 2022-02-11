import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AngularMaterialModule } from '../angular-material.module'

import { JobsCreateComponent } from './jobs-create/jobs-create.component'
import { JobsListComponent } from './jobs-list/jobs-list.component'

@NgModule({
  declarations: [JobsCreateComponent, JobsListComponent],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
})
export class AppJobsModule {}
