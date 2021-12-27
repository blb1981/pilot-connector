import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { JobsCreateComponent } from './jobs/jobs-create/jobs-create.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsCreateComponent,
    JobsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
