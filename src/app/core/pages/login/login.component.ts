import { Component, inject } from '@angular/core';
import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SocialButtonsComponent, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _authApiService=inject(AuthApiService);
  private readonly _toastrService = inject(ToastrService);
  
  
  loginForm!: FormGroup;
  loading:boolean=false;


  ngOnInit(): void {
    this.formInit();
  }

  // password "XyZ@9876"
  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    });

  }


  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }else{
      this.loading=true;
      this._authApiService.login(this.loginForm.value).subscribe(
        {
          next:(res)=>{
            this.loading=false;

          },
          error:(error)=>{
            this._toastrService.error(error.error.message);
            this.loading=false;

          },
        }
      )

    }
    console.log(this.loginForm)
  }

}
