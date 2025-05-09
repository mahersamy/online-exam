import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_BASE_URL, AuthApiService } from '@mahersamy/auth-api';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { AuthButtonComponent } from "../../../shared/components/ui/auth-button/auth-button.component";


@Component({
  selector: 'app-register',
  imports: [SocialButtonsComponent, ReactiveFormsModule, RouterLink, AuthButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);
  private readonly _Api = inject(API_BASE_URL);

  private readonly destroy$ = new Subject<void>(); 

  registerForm!: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.formInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  formInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    }, { validators: [this.validateRePassword] });
  }

  validateRePassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    return password === rePassword ? null : { misMatch: true };
  }

  submit(fn:()=>void){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      fn.call(this);
    }
  }
  register() {
      this.loading = true;
      this._authApiService.register(this.registerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.loading = false;
            this._router.navigate(['/auth/login']);
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
            this.loading = false;
          }
        });
    
  }
}
