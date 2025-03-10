import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialButtonsComponent } from "../components/social-buttons/social-buttons.component";

@Component({
  selector: 'app-verify-code',
  imports: [SocialButtonsComponent,ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
 verifyForm!: FormGroup;
  
    ngOnInit(): void {
      this.formInit();
    }
  
    formInit() {
      this.verifyForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      },);
    }
  
  
    sendCode() {
      if (this.verifyForm.invalid) {
        this.verifyForm.markAllAsTouched();
      }
      console.log(this.verifyForm)
    }
}
