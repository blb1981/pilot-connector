import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router, NavigationEnd } from '@angular/router'
import { filter, Subscription } from 'rxjs'

import { AuthService } from './auth/auth.service'
import { GenericDialog } from './generic-dialog.component/generic-dialog.component'
declare let gtag: Function

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated = false
  private authStatusSubscription: Subscription

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.authService.autoAuthenticateUser()
    this.isAuthenticated = this.authService.getIsAuth()
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(GenericDialog, {
      data: {
        dialogHeading: "We're sorry!",
        dialogBody:
          'We are not currently accepting new employers. Please check back later',
      },
    })
    dialogRef.afterClosed().subscribe((result) => {})
  }

  onLogout() {
    this.authService.logout()
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-C0XPJ8NLMR', {
          page_path: event.urlAfterRedirects,
        })
      })
  }
}
