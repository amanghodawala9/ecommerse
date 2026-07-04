import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Popup} from '../popup/popup';
import {DataService} from '../services/data-service';
import {Router, RouterLink} from '@angular/router';
import {EventService} from '../services/event-service';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, Popup, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  username: string = '';
  password: string = '';
  alreadyLogin = signal(false);
  isLoading = signal(true);
  showPopup = signal<boolean>(false);
  popupMessage = signal<string>('');
  loginFailed = signal<boolean>(false);

  constructor(private dataService: DataService, private eventService: EventService) {
  }

  ngOnInit() {
    cookieStore.get('curUser').then(user => {
      if(user) {
        this.alreadyLogin.set(true);
      }
    });
    setTimeout(() => this.isLoading.set(false), 100);
  }

  // username: kate_h
  // password: kfejk@*_
  login() {
    console.log(this.username);
    console.log(this.password);
    this.http.post<LoginResponse>('https://fakestoreapi.com/auth/login', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: res => {
        console.log(res);
        this.dataService.curUser.set(this.username);
        cookieStore.set('curUser', this.username).then(() => {});
        localStorage.setItem('curUser', this.username);
        this.popupMessage.set('Login Successful!');
        this.showPopup.set(true);
        this.loginFailed.set(false);
        this.alreadyLogin.set(true);
        setTimeout(() => {
          this.showPopup.set(false);
        }, 1000);
        this.eventService.loginSubject.next({});
      },
      error: err => {
        this.popupMessage.set('Login failed!');
        this.showPopup.set(true);
        this.loginFailed.set(true);
        console.log("Couldn't login");
        setTimeout(() => {
          this.showPopup.set(false);
        }, 1000);
      }
    });
  }
}
