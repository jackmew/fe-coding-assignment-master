import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Product;

  constructor() { }

  ngOnInit() {
  }

}
