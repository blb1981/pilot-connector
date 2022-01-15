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
  totalJobs = 0
  jobsPerPage = 5
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10, 25, 50, 100] // TODO: Remove 1, 2 for production

  constructor(public jobsService: JobsService) {}

  ngOnInit() {
    this.jobsService.getJobs(this.jobsPerPage, 1)
    this.isLoading = true
    this.jobsSub = this.jobsService
      .getJobsUpdatedListener()
      .subscribe((response: { jobs: Job[]; total: number }) => {
        this.isLoading = false
        this.totalJobs = response.total
        this.jobs = response.jobs
      })
  }

  onPageChanged(event: PageEvent) {
    // console.log(event)
    this.isLoading = true
    this.jobsPerPage = event.pageSize
    this.currentPage = event.pageIndex + 1
    this.jobsService.getJobs(this.jobsPerPage, this.currentPage)
  }

  onDelete(id: string) {
    this.isLoading = true
    this.jobsService.deleteJob(id).subscribe(() => {
      this.jobsService.getJobs(this.jobsPerPage, this.currentPage)
    })
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe()
  }
}
