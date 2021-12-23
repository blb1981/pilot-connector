import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import {Job} from '../job.model'
import { JobsService } from "../jobs.service";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html'
})
export class JobsListComponent implements OnInit, OnDestroy {
  jobs: Job[] = []
  private jobsSub: Subscription

  constructor(public jobsService: JobsService) {}

  ngOnInit() {
    this.jobs = this.jobsService.getJobs()
    this.jobsSub = this.jobsService.getJobsUpdatedListener()
    .subscribe((jobs: Job[]) => {
      this.jobs = jobs
    })
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe()
  }
}
