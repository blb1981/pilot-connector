import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { AuthData } from './auth-data.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    console.log('from authservice ...')

    const authData: AuthData = { email, password }

    this.http
      .post('http://localhost:3000/api/users/register', authData)
      .subscribe((response) => {
        console.log(response)
      })
  }
}
