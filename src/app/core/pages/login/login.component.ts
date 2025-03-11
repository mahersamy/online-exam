import { Component } from '@angular/core';
import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [SocialButtonsComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[\w]{6,}$/)]),
    });

  }


  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    console.log(this.loginForm)
  }

}
