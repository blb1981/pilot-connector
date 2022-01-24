import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Pilot Connector'
  summary = 'Free job postings for pilots'
  private authStatusSubscription: Subscription
  isAuthenticated = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth()
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
      })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe()
  }
}
