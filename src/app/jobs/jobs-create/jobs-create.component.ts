import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NgForm } from '@angular/forms'

import { JobsService } from '../jobs.service'
import { Job } from '../job.model'

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
})
export class JobsCreateComponent implements OnInit {
  enteredTitle = ''
  enteredContent = ''
  job: Job
  isLoading: boolean = false
  mode = 'create'
  private id: string

  constructor(public jobsService: JobsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit'
        this.id = paramMap.get('id')
        this.isLoading = true
        this.jobsService.getJob(this.id).subscribe((response) => {
          this.isLoading = false
          this.job = {
            id: response.data.job._id,
            title: response.data.job.title,
            content: response.data.job.content,
          }
        })
      } else {
        this.mode = 'create'
        this.id = null
      }
    })
  }

  onSaveJob(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true
    if (this.mode === 'create') {
      this.jobsService.addJob(form.value.title, form.value.content)
    } else {
      this.jobsService.updatejob(this.id, form.value.title, form.value.content)
    }

    form.resetForm()
  }
}
