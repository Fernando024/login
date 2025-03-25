import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserInfo(): Observable<any> {
  
    const userInfo = {
      name: 'Israel Sandoval',
      boleta: '2020300648',
      role: 'Encargado'
    };
    return of(userInfo); 
  }
}
