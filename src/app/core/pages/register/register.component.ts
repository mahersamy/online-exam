import { Component, OnInit } from '@angular/core';
import { SocialButtonsComponent } from "../components/social-buttons/social-buttons.component";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [SocialButtonsComponent,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {



  registerForm!:FormGroup;




  ngOnInit(): void {
    this.formInit();
  }

  formInit(){
    this.registerForm=new FormGroup({
      firstName:new FormControl(null,[Validators.required,]),
      lastName:new FormControl(null,[Validators.required,]),
      email:new FormControl(null,[Validators.required,Validators.email]),
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



  register(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }
    console.log(this.registerForm)
  }




}
