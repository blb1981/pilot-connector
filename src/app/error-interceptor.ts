import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { catchError, throwError } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'

import { ErrorComponent } from './error/error.component'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error has occurred.'
        console.log(error)
        // alert(error.statusText)
        if (error.error.message) {
          errorMessage = error.error.message
        }
        this.dialog.open(ErrorComponent, {
          data: { message: errorMessage },
        })
        return throwError(() => new Error('Something screwed up'))
      })
    )
  }
}
