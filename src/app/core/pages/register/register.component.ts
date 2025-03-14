import { Component, inject, OnInit } from '@angular/core';
import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_BASE_URL, AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [SocialButtonsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);
  private readonly _Api = inject(API_BASE_URL);
  


  registerForm!: FormGroup;

  loading:boolean=false;

  ngOnInit(): void {
    this.formInit();
    console.log(this._Api);
  }

  formInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required,]),
      firstName: new FormControl(null, [Validators.required,]),
      lastName: new FormControl(null, [Validators.required,]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword: new FormControl(null, [Validators.required,]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, { validators: [this.validateRePassword] });

  }


  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { misMatch: true }
    }


  }



  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.loading=true;
      this._authApiService.register(this.registerForm.value).subscribe(
        {
          next: (res) => {
            this.loading=false;
            this._router.navigate(["/auth/login"]);
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
            this.loading=false;

          }
          
          
        }
      )
    }
  }




}
