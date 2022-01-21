import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { AuthData } from './auth-data.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password }

    this.http
      .post('http://localhost:3000/api/users/register', authData)
      .subscribe((response) => {
        console.log(response)
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password }

    this.http
      .post<{ status: string; data: { token: string } }>(
        'http://localhost:3000/api/users/login',
        authData
      )
      .subscribe((response) => {
        const token = response.data.token
        this.token = token
      })
  }
}
