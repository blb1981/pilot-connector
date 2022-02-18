import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSidenav } from '@angular/material/sidenav'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { GenericDialog } from '../generic-dialog.component/generic-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Pilot Connector'
  summary = 'Classified Job Board for Pilots'
  private authStatusSubscription: Subscription
  isAuthenticated = false
  @Input() inputSidenav: MatSidenav

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe()
  }
}
