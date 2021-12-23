import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { JobsService } from "../jobs.service";

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html'
})
export class JobsCreateComponent {

  enteredTitle = ''
  enteredContent = ''

  constructor(public jobsService: JobsService) {}
  
  onAddJob(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.jobsService.addJob(form.value.title, form.value.content)
    
  }
}
