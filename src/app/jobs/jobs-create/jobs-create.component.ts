import { Component, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Job } from '../job.model'

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html'
})
export class JobsCreate {
  enteredTitle = ''
  enteredContent = ''
  @Output() jobCreated = new EventEmitter<Job>()

  onAddJob(form: NgForm) {
    if (form.invalid) {
      return
    }

    const job: Job = {
      title: form.value.title,
      content: form.value.content
    }
    this.jobCreated.emit(job)
  }
}
