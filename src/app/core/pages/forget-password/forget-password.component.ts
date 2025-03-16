import { Component, inject } from '@angular/core';
import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [SocialButtonsComponent,ReactiveFormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly _authApiService=inject(AuthApiService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);
  
  forgetForm!: FormGroup;
  setPasswordForm!: FormGroup;
  verifyForm!: FormGroup;


  sendCodeStep:boolean=true;
  verifyCodeStep:boolean=false;
  setPasswordStep:boolean=false;
  loading:boolean=false;

  



  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    },);

    this.setPasswordForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      newPassword:new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    },{validators:[this.validateRePassword]});

    this.verifyForm = new FormGroup({
      resetCode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    },);
  }


  sendCode(nextStep:boolean=true) {
    
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
    }else{
      this.loading=true;
      this._authApiService.forgetPassword(this.forgetForm.value).subscribe({
        next:(res)=>{
          if(nextStep==true){
            this.sendCodeStep=!this.sendCodeStep;
            this.verifyCodeStep=true;
            
          }
          this.loading=false;
        },
        error:(error)=>{
          this._toastrService.error(error.error.message);
          this.loading=false;
        }
      })
     
    }
    console.log(this.forgetForm)

  }


  verifyCode(){
    
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
    }else{
      this.loading=true;
      this._authApiService.verifyCode(this.verifyForm.value).subscribe({
        next:(res)=>{
          this.verifyCodeStep=!this.verifyCodeStep;
          this.setPasswordStep=true;
          this.loading=false;
          

        },
        error:(error)=>{
          this._toastrService.error(error.error.message);
          this.loading=false;
        }
      })
      
    
    }
 
    console.log(this.verifyForm)
  }


  setPassword(){
   
    if (this.setPasswordForm.invalid) {
      this.setPasswordForm.markAllAsTouched();
    }else{
      this.loading=true;
      this._authApiService.resetPassowrd(this.setPasswordForm.value).subscribe({
        next:(res)=>{
          this.loading=false;
          
          this._router.navigate(["/auth/login"]);

          
        },
        error:(error)=>{
          this._toastrService.error(error.error.message);
          this.loading=false;
        }
      })
    }
    console.log(this.setPasswordForm)
  }


  validateRePassword(form:AbstractControl){
          const password=form.get('password')?.value;
          const rePassword=form.get('confirmPassword')?.value;
          if(password===rePassword){
            return null;
          }else{
            return {misMatch:true}
          }

        }



     
}
