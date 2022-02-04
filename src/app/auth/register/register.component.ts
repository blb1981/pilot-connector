import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthData } from '../auth-data.model'

import { AuthService } from '../auth.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../auth-styles.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false
  authStatusSubscription: Subscription

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false
      })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.isLoading = true
    const authData: AuthData = {
      companyName: form.value.companyName,
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      passwordConfirm: form.value.passwordConfirm,
    }
    this.authService.createUser(authData)
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }
}
