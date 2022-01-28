import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from './job.model'

@Injectable({ providedIn: 'root' })
export class JobsService {
  private jobs: Job[] = []
  private jobsUpdated = new Subject<{ jobs: Job[]; total: number }>()

  constructor(private http: HttpClient, private router: Router) {}

  getJobs(limit: number, page: number) {
    const queryParams = `?limit=${limit}&page=${page}`
    this.http
      .get<{
        status: string
        data: {
          total: number
          jobs: [
            {
              _id: string
              title: string
              content: string
              imagePath: string
              user: string
            }
          ]
        }
      }>('http://localhost:3000/api/jobs' + queryParams)
      .pipe(
        map((response) => {
          return {
            jobs: response.data.jobs.map((document) => {
              return {
                title: document.title,
                content: document.content,
                id: document._id,
                imagePath: document.imagePath,
                user: document.user,
              }
            }),
            total: response.data.total,
          }
        })
      )
      .subscribe((transformedDocumentsData) => {
        this.jobs = transformedDocumentsData.jobs
        this.jobsUpdated.next({
          jobs: [...this.jobs],
          total: transformedDocumentsData.total,
        })
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
          user: string
        }
      }
    }>(`http://localhost:3000/api/jobs/${id}`)
  }

  addJob(title: string, content: string, image: File) {
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
      postData = { id, title, content, imagePath: image, user: null }
    }

    this.http.put(`http://localhost:3000/api/jobs/${id}`, postData).subscribe({
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.router.navigate(['/'])
      },
    })
  }

  deleteJob(id: string) {
    return this.http.delete<{ message: string }>(
      `http://localhost:3000/api/jobs/${id}`
    )
    // .subscribe(() => {
    //   const updatedJobs = this.jobs.filter((job) => job.id !== id)
    //   this.jobs = updatedJobs
    //   this.jobsUpdated.next([...this.jobs])
    // })
  }
}
