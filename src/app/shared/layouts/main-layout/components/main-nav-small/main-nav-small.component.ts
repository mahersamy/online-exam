import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-nav-small',
  imports: [],
  templateUrl: './main-nav-small.component.html',
  styleUrl: './main-nav-small.component.scss',
})
export class MainNavSmallComponent {
  isSearchHidden: boolean = false;
  isLinksHiddden: boolean = false;

  searchHiddenToggle() {
    this.isSearchHidden = !this.isSearchHidden;
  }

  linksHiddenToggle() {
    this.isLinksHiddden = !this.isLinksHiddden;
  }
}
