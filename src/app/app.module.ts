import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JobsCreate } from './jobs-create/jobs-create.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsCreate
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
