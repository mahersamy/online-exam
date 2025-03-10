import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialButtonsComponent } from '../components/social-buttons/social-buttons.component';

@Component({
  selector: 'app-set-password',
  imports: [SocialButtonsComponent,ReactiveFormsModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  setPasswordForm!: FormGroup;
  
    ngOnInit(): void {
      this.formInit();
    }
  
    formInit() {
      this.setPasswordForm = new FormGroup({
        password:new FormControl(null,[Validators.required,Validators.pattern(/^[\w]{6,}$/)]),
        confirmPassword:new FormControl(null,[Validators.required,]),
      },{validators:[this.validateRePassword]});
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
    
  
  
    sendCode() {
      if (this.setPasswordForm.invalid) {
        this.setPasswordForm.markAllAsTouched();
      }
      console.log(this.setPasswordForm)
    }

}
