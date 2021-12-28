import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs"
import { Job } from './job.model'

@Injectable({providedIn: 'root'})
export class JobsService  {
  private jobs: Job[] = []
  private jobsUpdated = new Subject<Job[]>()

  constructor(private http: HttpClient) {}

  getJobs() {
    this.http.get<Job[]>('http://localhost:3000/api/jobs').subscribe((data) => {
      this.jobs = data
      this.jobsUpdated.next([...this.jobs])
    })
  }

  getJobsUpdatedListener() {
    return this.jobsUpdated.asObservable()
  }

  addJob(title: string, content: string) {
    const job: Job = {
      id: null,
      title,
      content
    }
    console.log(job)
    this.http.post<{message: string}>('http://localhost:3000/api/jobs', job).subscribe((data) => {
      console.log(data)

      // Local copy only gets updated in the success case
      this.jobs.push(job)
      this.jobsUpdated.next([...this.jobs])
    })
  }

}
