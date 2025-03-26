import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { Store } from '@ngrx/store';




import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { setToken } from '../../store/auth.actions';


@Component({
  selector: 'app-login',
  imports: [SocialButtonsComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _authApiService = inject(AuthApiService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _store=inject(Store<string>);
  private readonly destroy$ = new Subject<void>();

  loginForm!: FormGroup;
  loading: boolean = false;


  ngOnInit(): void {
    this.formInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
    });
  }

  submit(fn:()=>void){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      fn.call(this);
    }
  }

  login():void{
      this.loading = true;
      this._authApiService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe({
          next: (res) => {
            this.loading = false;
            localStorage.setItem("token",res.token);
            this._store.dispatch(setToken({user:jwtDecode(res.token)}))
          },
          error: (error) => {
            this._toastrService.error(error.error.message);
            this.loading = false;
          }
        });
  }

  

}
