import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

import { AuthService } from '../auth.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['../auth-styles.css'],
})
export class LoginComponent {
  isLoading = false

  constructor(public authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.isLoading = true
    this.authService.login(form.value.email, form.value.password)
  }
}
