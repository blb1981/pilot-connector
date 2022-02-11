import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AngularMaterialModule } from '../angular-material.module'
import { AppRoutingModule } from '../app-routing.module'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [FormsModule, CommonModule, AngularMaterialModule, AppRoutingModule],
})
export class AuthModule {
  //
}
