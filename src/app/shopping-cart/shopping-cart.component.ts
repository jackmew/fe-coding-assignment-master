import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor(private productsService: ProductService) { }

  ngOnInit() {
    console.log('shopping-cart ngOnInit')
    this.cartItems = this.productsService.getCartProductsAll()
    // this.productsService.getCartProductsAll().subscribe(cartItems => this.cartItems = cartItems)
    console.log('cartItems', this.cartItems)
  }

}
