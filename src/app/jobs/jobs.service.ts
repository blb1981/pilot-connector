import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from './job.model'
import { stringify } from 'querystring'

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[] = []
  private jobsUpdated = new Subject<Job[]>()

  constructor(private http: HttpClient) {}

  getJobs() {
    this.http
      .get<{ message: string; documents: any }>(
        'http://localhost:3000/api/jobs'
      )
      .pipe(
        map((data) => {
          return data.documents.map((document) => {
            return {
              title: document.title,
              content: document.content,
              id: document._id,
            }
          })
        })
      )
      .subscribe((transformedDocuments) => {
        this.jobs = transformedDocuments
        this.jobsUpdated.next([...this.jobs])
      })
  }

  getJobsUpdatedListener() {
    return this.jobsUpdated.asObservable()
  }

  getJob(id: string) {
    // return { ...this.jobs.find((job) => job.id === id) }
    return this.http.get<{
      message: string
      status: string
      data: {
        job: {
          _id: string
          title: string
          content: string
        }
      }
    }>(`http://localhost:3000/api/jobs/${id}`)
  }

  addJob(title: string, content: string) {
    const job: Job = { id: null, title, content }
    this.http
      .post<{ message: string; document: any }>(
        'http://localhost:3000/api/jobs',
        job
      )
      .subscribe((data) => {
        // Get id from db to add to frontend
        const id = data.document._id
        job.id = id

        // Local copy only gets updated in the success case
        this.jobs.push(job)
        this.jobsUpdated.next([...this.jobs])
      })
  }

  updatejob(id: string, title: string, content: string) {
    const job: Job = { id, title, content }
    this.http
      .put(`http://localhost:3000/api/jobs/${id}`, job)
      .subscribe((response) => {
        console.log(response, 'from jobs service')
        const updatedJobs = [...this.jobs]
        const oldJobIndex = updatedJobs.findIndex((job) => job.id === id)
        updatedJobs[oldJobIndex] = job
        this.jobs = updatedJobs
        this.jobsUpdated.next([...this.jobs])
      })
  }

  deleteJob(id: string) {
    this.http
      .delete<{ message: string }>(`http://localhost:3000/api/jobs/${id}`)
      .subscribe(() => {
        const updatedJobs = this.jobs.filter((job) => job.id !== id)
        this.jobs = updatedJobs
        this.jobsUpdated.next([...this.jobs])
      })
  }
}
