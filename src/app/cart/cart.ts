import {Component, computed, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  productsInCart = signal<Product[]>([]);
  totalPrice = computed(() => this.productsInCart().reduce((a, b) => a + b.price, 0));
  constructor(private http: HttpClient) {
    let productIds = JSON.parse(localStorage.getItem('cartItems') ?? '[]');
    this.http.get<Product[]>('https://fakestoreapi.com/products').subscribe(products => {
      this.productsInCart.set(products.filter(item => productIds.includes(item.id)));
      console.log(this.productsInCart());
    });
  }
}
