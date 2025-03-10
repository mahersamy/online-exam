import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FlowbitService} from './shared/services/flowbit/flowbit.service'
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'online-exam';
  private readonly _flowbiteService=inject(FlowbitService);
  
  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
