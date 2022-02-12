import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from './job.model'
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + 'jobs/'

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
      }>(BACKEND_URL + queryParams)
      .pipe(
        map((response) => {
          return {
            jobs: response.data.jobs.map((document) => {
              return {
                id: document._id,
                headline: document.headline,
                summary: document.summary,
                compensation: document.compensation,
                airports: document.airports,
                imagePath: document.imagePath,
                startDate: document.startDate,
                endDate: document.endDate,
                user: document.user,
                //TODO: Spread operator work better here ??
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
    }>(BACKEND_URL + id)
    // }>(`http://localhost:3000/api/jobs/${id}`)
  }

  addJob(
    headline: string,
    summary: string,
    compensation: string,
    airports: string,
    // image: File | string,
    startDate: string,
    endDate: string
  ) {
    const postData = new FormData()
    postData.append('headline', headline)
    postData.append('summary', summary)
    postData.append('compensation', compensation)
    postData.append('airports', airports)
    // postData.append('image', image, title)
    postData.append('startDate', startDate)
    postData.append('endDate', endDate)

    this.http.post(BACKEND_URL, postData).subscribe((response) => {
      this.router.navigate(['/'])
    })
  }

  updateJob(
    id: string,
    headline: string,
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
      headline,
      summary,
      compensation,
      airports,
      // imagePath: image,
      startDate,
      endDate,
      user: null,
    }

    this.http.put(BACKEND_URL + id, postData).subscribe({
      next: (response) => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.router.navigate(['/'])
      },
    })
  }

  deleteJob(id: string) {
    return this.http.delete<{ message: string }>(BACKEND_URL + id)
  }
}
