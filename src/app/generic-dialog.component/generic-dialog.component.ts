import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import {} from '@angular/material/dialog'

import { genericDialogContent } from './generic-dialog.model'

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
})
export class GenericDialog {
  constructor(
    public dialogRef: MatDialogRef<GenericDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: genericDialogContent
  ) {}
  onNoClick(): void {
    this.dialogRef.close()
  }
}
