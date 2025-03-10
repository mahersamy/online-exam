import { Component } from '@angular/core';
import { SocialButtonsComponent } from "../components/social-buttons/social-buttons.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [SocialButtonsComponent,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
forgetForm!: FormGroup;

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    },);
  }


  sendCode() {
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
    }
    console.log(this.forgetForm)
  }
}
