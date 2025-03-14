import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root'
})
export class ForgetApiAdaptorService implements Adaptor{

  adapt(data:any){
    return {
      message:data.message,
      info:data.info
    }
  }
}
