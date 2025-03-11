import { Component } from '@angular/core';
import { SocialButtonsComponent } from "../../layouts/auth-layout/components/social-buttons/social-buttons.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [SocialButtonsComponent,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  forgetForm!: FormGroup;
  setPasswordForm!: FormGroup;
  verifyForm!: FormGroup;


  sendCodeStep:boolean=true;
  verifyCodeStep:boolean=false;
  setPasswordStep:boolean=false;
  



  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    },);

    this.setPasswordForm = new FormGroup({
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[\w]{6,}$/)]),
      confirmPassword:new FormControl(null,[Validators.required,]),
    },{validators:[this.validateRePassword]});

    this.verifyForm = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    },);
  }


  sendCode() {
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
    }
    this.sendCodeStep=!this.sendCodeStep;
    this.verifyCodeStep=true;
    console.log(this.forgetForm)
  }


  verifyCode(){
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
    }
    this.verifyCodeStep=!this.verifyCodeStep;
    this.setPasswordStep=true;
    console.log(this.verifyForm)
  }


  setPassword(){
    if (this.setPasswordForm.invalid) {
      this.setPasswordForm.markAllAsTouched();
    }
    this.setPasswordStep=!this.setPasswordStep;
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
