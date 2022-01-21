import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Pilot Connector'
  summary = 'Free job postings for pilots'
  private authListenerSubscription: Subscription
  isAuthenticated = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
      })
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe()
  }
}
