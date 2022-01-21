import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { MatPaginatorModule } from '@angular/material/paginator'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptor } from './auth/auth-interceptor'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JobsCreateComponent } from './jobs/jobs-create/jobs-create.component'
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    JobsCreateComponent,
    JobsListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
