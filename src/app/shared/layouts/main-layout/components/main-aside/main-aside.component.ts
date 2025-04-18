import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';


@Component({
  selector: 'app-main-aside',
  imports: [],
  templateUrl: './main-aside.component.html',
  styleUrl: './main-aside.component.scss'
})
export class MainAsideComponent {
  private readonly _router=inject(Router);
  private readonly _authApiService=inject(AuthApiService);
  logOut(){
    this._authApiService.logOut().subscribe(
      {
        next:(res)=>{
          localStorage.clear();
          this._router.navigate(["/auth/login"]);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
   

  }

}
