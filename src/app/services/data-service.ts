import {Injectable, Service, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataService {
  curUser = signal<string>('');
}
