import { Component, signal } from '@angular/core';
import {Navbar} from './navbar/navbar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerse');
  isLoggedIn = signal<boolean>(false);
  async logoutUser() {
    console.log('logoutUser');
    const cookies = await cookieStore.getAll();
    for (const cookie of cookies) {
      await cookieStore.delete(cookie.name ?? '');
    }
    localStorage.clear();
    window.location.reload();
  }
}
