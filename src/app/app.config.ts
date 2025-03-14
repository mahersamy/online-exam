import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';



import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from './core/environment/environment';
import { API_BASE_URL } from 'auth-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch()),
      provideAnimations(),
      provideToastr(),
      {
        provide:API_BASE_URL,
        useValue:environment.baseUrl
  
      }
  
      
    ]
};
