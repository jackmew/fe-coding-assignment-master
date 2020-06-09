import { Component, OnInit } from '@angular/core';
import {CartItem} from '../models/cartItem';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = []
  public totalAmount: number = 0

  constructor(private productsService: ProductService) { }

  ngOnInit() {
    this.cartItems = this.productsService.getCartItemsAll()
    this.productsService.currentTotalAmount.subscribe((totalAmount: number) => this.totalAmount = totalAmount)
  }
}
