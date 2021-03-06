import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'

import { AuthService } from 'src/app/auth/auth.service'
import { Job } from '../job.model'
import { JobsService } from '../jobs.service'
import { GenericDialog } from 'src/app/generic-dialog.component/generic-dialog.component'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs: Job[] = []
  isLoading = false
  private jobsSub: Subscription
  totalJobs = 0
  jobsPerPage = 5
  currentPage = 1
  pageSizeOptions = [5, 10, 25, 50]
  private authStatusSubscription: Subscription
  isAuthenticated = false
  userId: string

  constructor(
    public jobsService: JobsService,
    private authService: AuthService,
    public dialog: MatDialog
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

  openDialog() {
    const dialogRef = this.dialog.open(GenericDialog, {
      data: {
        dialogHeading: "We're sorry!",
        dialogBody: 'This feature is currently disabled.',
      },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe()
    this.authStatusSubscription.unsubscribe()
  }
}
