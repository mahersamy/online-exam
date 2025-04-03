import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-aside',
  imports: [],
  templateUrl: './main-aside.component.html',
  styleUrl: './main-aside.component.scss'
})
export class MainAsideComponent {
  private readonly _router=inject(Router);
  logOut(){
    localStorage.clear();
    this._router.navigate(["/auth/login"]);

  }

}
