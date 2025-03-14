import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeApiAdaptorService implements Adaptor{
  adapt(data: any) {
    return {
      status:data.status

    }
  }


}
