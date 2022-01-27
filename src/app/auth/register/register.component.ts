import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../auth-styles.css'],
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
    this.authService.createUser(form.value.email, form.value.password)
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }
}
