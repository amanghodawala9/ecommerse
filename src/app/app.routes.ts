import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Cart} from './cart/cart';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cart', component: Cart }
];
