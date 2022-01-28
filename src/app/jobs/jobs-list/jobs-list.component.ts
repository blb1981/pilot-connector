import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'

import { AuthService } from 'src/app/auth/auth.service'
import { Job } from '../job.model'
import { JobsService } from '../jobs.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs: Job[] = []
  isLoading = false
  private jobsSub: Subscription
  totalJobs = 0
  jobsPerPage = 5
  currentPage = 1
  // TODO: Pagination: when on page 2, you can't return to page 1
  pageSizeOptions = [1, 2, 5, 10, 25, 50, 100] // TODO: Remove 1, 2 for production
  private authStatusSubscription: Subscription
  isAuthenticated = false
  userId: string

  constructor(
    public jobsService: JobsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.jobsService.getJobs(this.jobsPerPage, this.currentPage)
    this.isLoading = true
    this.userId = this.authService.getUserId()
    this.jobsSub = this.jobsService
      .getJobsUpdatedListener()
      .subscribe((response: { jobs: Job[]; total: number }) => {
        this.isLoading = false
        this.totalJobs = response.total
        this.jobs = response.jobs
      })
    this.isAuthenticated = this.authService.getIsAuth()
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
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
    this.jobsService.deleteJob(id).subscribe({
      next: () => {
        this.jobsService.getJobs(this.jobsPerPage, this.currentPage)
      },
      error: (error) => {
        this.isLoading = false
      },
    })
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe()
    this.authStatusSubscription.unsubscribe()
  }
}
