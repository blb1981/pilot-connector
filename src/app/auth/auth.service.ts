import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'

import { AuthData } from './auth-data.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string
  private authStatusListener = new Subject<boolean>()
  private isAuthenticated = false
  private tokenTimer: any
  private userId: string

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getUserId() {
    return this.userId
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  createUser(authData: AuthData) {
    this.http
      .post('http://localhost:3000/api/users/register', authData)
      .subscribe({
        complete: () => {
          alert('Register successful')
          this.router.navigate(['/login'])
        },
        error: () => {
          this.authStatusListener.next(false)
        },
      })
  }

  login(email: string, password: string) {
    this.http
      .post<{
        status: string
        data: { token: string; expiresIn: number; userId: string }
      }>('http://localhost:3000/api/users/login', { email, password })
      .subscribe({
        next: (response) => {
          const token = response.data.token
          this.token = token
          if (token) {
            const expiresInDuration = response.data.expiresIn
            this.setAuthTimer(expiresInDuration)
            this.isAuthenticated = true
            this.userId = response.data.userId
            this.authStatusListener.next(true)
            const now = new Date()
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            )
            console.log(expirationDate)
            this.saveAuthData(token, expirationDate, this.userId)
            this.router.navigate(['/'])
          }
        },
        error: () => {
          this.authStatusListener.next(false)
        },
      })
  }

  autoAuthenticateUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    if (expiresIn > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.userId = authInformation.userId
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.userId = null
    this.clearAuthData()
    clearTimeout(this.tokenTimer)
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userId', userId)
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    if (!token || !expirationDate) {
      return
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }
}
