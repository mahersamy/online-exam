import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';

@Injectable({
  providedIn: 'root'
})
export class SubjectApiAdaptorService implements Adaptor{

  adapt(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.transform(item));
    }
    return this.transform(data);
  }

  private transform(item: any) {
    return {
      _id: item._id,
      name: item.name,
      icon: item.icon,
      createdAt: item.createdAt
    };
  }

  
}
