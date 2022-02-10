import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { AuthService } from 'src/app/auth/auth.service'
import { JobsService } from '../jobs.service'
import { Job } from '../job.model'
import { ValidateFn } from 'mongoose'
// import { mimeType } from './mime-type.validator'

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
  styleUrls: ['./jobs-create.component.scss'],
})
export class JobsCreateComponent implements OnInit, OnDestroy {
  // enteredTitle = ''
  // enteredSummary = ''
  // enteredCompensation = ''
  // enteredAirports = ''
  // enteredStartDate = ''
  // enteredEndDate = ''
  job: Job
  isLoading: boolean = false
  form: FormGroup
  // imagePreview: string
  mode = 'create'
  private id: string
  private authStatusSubscription: Subscription
  date: Date
  minDateString: string

  constructor(
    public jobsService: JobsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.date = new Date()
    this.minDateString = this.date.toISOString().split('T')[0]
    // this.minDateString = this.date.getTime()
    console.log(this.minDateString)
  }

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe({
        next: (authStatus) => {
          this.isLoading = false
        },
      })

    this.form = new FormGroup({
      headline: new FormControl(
        { value: null, disabled: this.isLoading },
        {
          validators: [Validators.required, Validators.min(3)],
        }
      ),
      summary: new FormControl(
        { value: null, disabled: this.isLoading },
        {
          validators: [Validators.required],
        }
      ),
      compensation: new FormControl(
        { value: null, disabled: this.isLoading },
        {
          validators: [Validators.required],
        }
      ),
      airports: new FormControl({ value: null, disabled: this.isLoading }),
      startDate: new FormControl(
        {
          value: null,
          disabled: this.isLoading,
          min: new Date().toISOString().split('T')[0],
        },
        {
          validators: [Validators.required],
        }
      ),
      endDate: new FormControl(
        {
          value: null,
          disabled: this.isLoading,
          min: new Date().toISOString().split('T')[0],
        },
        {
          validators: [Validators.required],
        }
      ),
      // image: new FormControl(null),
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
            headline: response.data.job.headline,
            summary: response.data.job.summary,
            compensation: response.data.job.compensation,
            airports: response.data.job.airports,
            // imagePath: response.data.job.imagePath,
            startDate: response.data.job.startDate,
            endDate: response.data.job.endDate,
            user: response.data.job.user,
          }
          this.form.setValue({
            headline: this.job.headline,
            summary: this.job.summary,
            compensation: this.job.compensation,
            airports: this.job.airports,
            // imagePath: this.job.imagePath,
            startDate: this.job.startDate,
            endDate: this.job.endDate,
          })
          // this.imagePreview = response.data.job.imagePath
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
      this.jobsService.addJob(
        this.form.value.headline,
        this.form.value.summary,
        this.form.value.compensation,
        this.form.value.airports,
        this.form.value.startDate,
        this.form.value.endDate
      )
    } else {
      this.jobsService.updateJob(
        this.id,
        this.form.value.headline,
        this.form.value.summary,
        this.form.value.compensation,
        this.form.value.airports,
        this.form.value.startDate,
        this.form.value.endDate
      )
    }

    this.form.reset()
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0]
  //   this.form.patchValue({ image: file })
  //   this.form.get('image').updateValueAndValidity()
  //   const reader = new FileReader()
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string
  //   }
  //   reader.readAsDataURL(file)
  // }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }
}
