import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { JobsService } from '../jobs.service'
import { Job } from '../job.model'

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
  styleUrls: ['./jobs-create.component.css'],
})
export class JobsCreateComponent implements OnInit {
  enteredTitle = ''
  enteredContent = ''
  job: Job
  isLoading: boolean = false
  form: FormGroup
  imagePreview: string
  mode = 'create'
  private id: string

  constructor(public jobsService: JobsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.min(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, { validators: [Validators.required] }),
    })

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
          this.form.setValue({
            title: this.job.title,
            content: this.job.content,
          })
        })
      } else {
        this.mode = 'create'
        this.id = null
      }
    })
  }

  onSaveJob() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true
    if (this.mode === 'create') {
      this.jobsService.addJob(this.form.value.title, this.form.value.content)
    } else {
      this.jobsService.updatejob(
        this.id,
        this.form.value.title,
        this.form.value.content
      )
    }

    this.form.reset()
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ image: file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
