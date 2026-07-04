import {Component, EventEmitter, Output, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {EventService} from '../services/event-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Output() logoutEvent = new EventEmitter();
  isLoggedIn = signal<boolean>(false);
  showMobileMenu = signal<boolean>(false);
  numberOfItems = signal<number>(0);

  constructor(private eventService: EventService, private router: Router) {
    if (localStorage.getItem('curUser') !== null) {
      this.isLoggedIn.set(true);
    }
    this.eventService.loginEvent$.subscribe((event) => {
      this.isLoggedIn.set(true);
    });
    this.numberOfItems.set(JSON.parse(localStorage.getItem('cartItems') ?? '[]').length);
    this.eventService.cartEvent$.subscribe(cart => {
      this.numberOfItems.set(cart.length);
    });
  }

  logout() {
    console.log('logout');
    this.logoutEvent.emit();
    this.isLoggedIn.set(false);
  }

  async goToCart() {
    await this.router.navigate(['/cart']);
  }
}
