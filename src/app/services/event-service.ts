import {Service} from '@angular/core';
import {Subject} from 'rxjs';

@Service()
export class EventService {
  public loginSubject= new Subject<any>();
  public loginEvent$ = this.loginSubject.asObservable();
  public cartSubject= new Subject<any>();
  public cartEvent$ = this.cartSubject.asObservable();
}
