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

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password }

    this.http
      .post('http://localhost:3000/api/users/register', authData)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['login'])
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password }

    this.http
      .post<{ status: string; data: { token: string; expiresIn: number } }>(
        'http://localhost:3000/api/users/login',
        authData
      )
      .subscribe((response) => {
        const token = response.data.token
        this.token = token
        if (token) {
          const expiresInDuration = response.data.expiresIn
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true
          this.authStatusListener.next(true)
          const now = new Date()
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          )
          console.log(expirationDate)
          this.saveAuthData(token, expirationDate)
          this.router.navigate(['/'])
        }
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
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.clearAuthData()
    clearTimeout(this.tokenTimer)
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    if (!token || !expirationDate) {
      return
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
    }
  }

  private setAuthTimer(duration: number) {
    console.log('setting timeer', duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }
}
