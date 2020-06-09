import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'shopping-cart-icon',
  templateUrl: './shopping-cart-icon.component.html',
  styleUrls: ['./shopping-cart-icon.component.css']
})
export class ShoppingCartIconComponent implements OnInit {
  
  public count: number

  constructor(private productsService: ProductService) { }

  ngOnInit() {
    // sync localStorage cartItems
    this.productsService.getCartItemsAll()
    this.productsService.currentCount.subscribe((count: number) => this.count = count)
  }
}
