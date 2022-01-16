import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoading = false

  onSubmit(form: NgForm) {
    console.log(form.value)
  }
}
