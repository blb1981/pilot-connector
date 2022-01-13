import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import { Job } from '../job.model'
import { JobsService } from '../jobs.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs: Job[] = []
  isLoading: boolean = false
  private jobsSub: Subscription
  totalJobs = 10
  jobsPerPage = 5
  pageSizeOptions = [2, 5, 10, 25, 50, 100] // TODO: Remove 2 for production

  constructor(public jobsService: JobsService) {}

  ngOnInit() {
    this.jobsService.getJobs()
    this.isLoading = true
    this.jobsSub = this.jobsService
      .getJobsUpdatedListener()
      .subscribe((jobs: Job[]) => {
        this.isLoading = false
        this.jobs = jobs
      })
  }

  onDelete(id: string) {
    this.jobsService.deleteJob(id)
  }

  onPageChanged(event: PageEvent) {
    console.log(event)
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe()
  }
}
