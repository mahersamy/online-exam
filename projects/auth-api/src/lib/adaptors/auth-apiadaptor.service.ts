import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor {

  adapt(data:any){
    return {
      message:data.message,
      token:data.token,
      userEmail:data.user.email
    }
  }
}
