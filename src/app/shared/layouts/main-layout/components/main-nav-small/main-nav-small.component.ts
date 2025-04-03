import { Component,ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-nav-small',
  imports: [],
  templateUrl: './main-nav-small.component.html',
  styleUrl: './main-nav-small.component.scss'
})
export class MainNavSmallComponent {

  isHidden: boolean = false;

  searchHiddenToggle() {
    this.isHidden = !this.isHidden;

}
}
