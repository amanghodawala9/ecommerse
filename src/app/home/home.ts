import {Component, signal, WritableSignal} from '@angular/core';
import {DataService} from '../services/data-service';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../services/event-service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class Home {
  curUser = signal<string>('');
  products= signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  searchControl = new FormControl('');
  cartItems: number[] = [];

  constructor(private dataService: DataService, private http: HttpClient, private eventService: EventService) {
    cookieStore.get('curUser').then(user => {
      if (user) {
        this.curUser.set(user.value ?? '');
      }
    });
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(products => {
      this.products.set(products);
      this.filteredProducts.set(products);
    });
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(searchTerm => {
      this.filterItems(searchTerm ?? '');
    });
  }

  filterItems(str: string) {
    str = str.toLowerCase();
    let tmp = this.products().filter(product => product.title.toLowerCase().includes(str));
    this.filteredProducts.set(tmp);
  }

  addToCart(id: number) {
    if(this.curUser() == '') {
      alert("Please login first!");
      return;
    }
    this.cartItems.push(id);
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    this.eventService.cartSubject.next(this.cartItems);
    console.log(this.cartItems);
  }

  removeFromCart(id: number) {
    if(this.curUser() == '') {
      alert("Please login first!");
      return;
    }
    let index = this.cartItems.indexOf(id);
    this.cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    this.eventService.cartSubject.next(this.cartItems);
  }
}
