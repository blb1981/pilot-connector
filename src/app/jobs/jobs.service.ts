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
          jobs: [any]
        }
      }>('http://localhost:3000/api/jobs' + queryParams)
      .pipe(
        map((response) => {
          return {
            jobs: response.data.jobs.map((document) => {
              return {
                id: document._id,
                title: document.title,
                summary: document.summary,
                compensation: document.compensation,
                airports: document.airports,
                imagePath: document.imagePath,
                startDate: document.startDate,
                endDate: document.endDate,
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
        job: any
      }
    }>(`http://localhost:3000/api/jobs/${id}`)
  }

  addJob(
    title: string,
    summary: string,
    compensation: string,
    airports: string,
    // image: File | string,
    startDate: string,
    endDate: string
  ) {
    console.log('where are we? in addjob method, jobs.service')
    const postData = new FormData()
    postData.append('title', title)
    postData.append('summary', summary)
    postData.append('compensation', compensation)
    postData.append('airports', airports)
    // postData.append('image', image, title)
    postData.append('startDate', startDate)
    postData.append('endDate', endDate)
    console.log('postData...does it look right???', postData)

    this.http
      .post('http://localhost:3000/api/jobs', postData)
      .subscribe((response) => {
        this.router.navigate(['/'])
      })
  }

  updateJob(
    id: string,
    title: string,
    summary: string,
    compensation: string,
    airports: string,
    // image: File | string,
    startDate: string,
    endDate: string
  ) {
    let postData: Job | FormData
    // if (typeof image === 'object') {
    //   postData = new FormData()
    //   postData.append('id', id)
    //   postData.append('title', title)
    //   postData.append('summary', summary)
    //   postData.append('compensation', compensation)
    //   postData.append('airports', airports)
    //   postData.append('image', image, title)
    //   postData.append('startDate', startDate)
    //   postData.append('endDate', endDate)
    // }
    // else {
    //   postData = {
    //     id,
    //     title,
    //     summary,
    //     compensation,
    //     airports,
    //     imagePath: image,
    //     startDate,
    //     endDate,
    //     user: null,
    //   }
    postData = {
      id,
      title,
      summary,
      compensation,
      airports,
      // imagePath: image,
      startDate,
      endDate,
      user: null,
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
  }
}
