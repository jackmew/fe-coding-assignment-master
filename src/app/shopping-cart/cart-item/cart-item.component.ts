import { Component, OnInit, Input } from '@angular/core';
import {CartItem} from '../../models/cartItem';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;

  constructor(private productsService: ProductService) { }

  ngOnInit() {
  }

  removeCartItem() {
    console.log('removeCartItem')
    this.productsService.removeCartItem(this.cartItem)
  }
}
