import { Injectable } from "@angular/core";
import { Subject } from "rxjs"
import { Job } from './job.model'

@Injectable({providedIn: 'root'})
export class JobsService  {
  private jobs: Job[] = []
  private jobsUpdated = new Subject<Job[]>()

  getJobs() {
    return [...this.jobs]
  }

  getJobsUpdatedListener() {
    return this.jobsUpdated.asObservable()
  }

  addJob(title: string, content: string) {
    const job: Job = {
      id: Date.now().toString(),
      title,
      content
    }
    this.jobs.push(job)
    this.jobsUpdated.next([...this.jobs])
  }

}
