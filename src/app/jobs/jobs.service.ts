import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from './job.model'

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[] = []
  private jobsUpdated = new Subject<Job[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getJobs() {
    this.http
      .get<{
        status: string
        data: {
          jobs: [
            { _id: string; title: string; content: string; imagePath: string }
          ]
        }
      }>('http://localhost:3000/api/jobs')
      .pipe(
        map((data) => {
          return data.data.jobs.map((document) => {
            return {
              title: document.title,
              content: document.content,
              id: document._id,
              imagePath: document.imagePath,
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
    return this.http.get<{
      status: string
      data: {
        job: {
          _id: string
          title: string
          content: string
          imagePath: string
        }
      }
    }>(`http://localhost:3000/api/jobs/${id}`)
  }

  addJob(title: string, content: string, image: File) {
    // const job: Job = { id: null, title, content }
    const postData = new FormData()
    postData.append('title', title)
    postData.append('content', content)
    postData.append('image', image, title)

    this.http
      .post<{
        status: string
        data: {
          job: {
            _id: string
            title: string
            content: string
            imagePath: string
          }
        }
      }>('http://localhost:3000/api/jobs', postData)
      .subscribe((response) => {
        const job: Job = {
          id: response.data.job._id,
          title,
          content,
          imagePath: response.data.job.imagePath,
        }

        const id = response.data.job._id

        this.jobs.push(job)
        this.jobsUpdated.next([...this.jobs])
        this.router.navigate(['/'])
      })
  }

  updateJob(id: string, title: string, content: string, image: File | string) {
    let postData: Job | FormData
    if (typeof image === 'object') {
      postData = new FormData()
      postData.append('id', id)
      postData.append('title', title)
      postData.append('content', content)
      postData.append('image', image, title)
    } else {
      console.log(postData)
      postData = { id, title, content, imagePath: image }
    }

    this.http
      .put(`http://localhost:3000/api/jobs/${id}`, postData)
      .subscribe((response) => {
        const updatedJobs = [...this.jobs]
        const oldJobIndex = updatedJobs.findIndex((job) => job.id === id)
        const job: Job = {
          id,
          title,
          content,
          imagePath: '',
        }
        updatedJobs[oldJobIndex] = job
        this.jobs = updatedJobs
        this.jobsUpdated.next([...this.jobs])
        this.router.navigate(['/'])
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
