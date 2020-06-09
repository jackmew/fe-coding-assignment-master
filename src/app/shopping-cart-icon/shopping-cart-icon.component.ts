import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'shopping-cart-icon',
  templateUrl: './shopping-cart-icon.component.html',
  styleUrls: ['./shopping-cart-icon.component.css']
})
export class ShoppingCartIconComponent implements OnInit {
  // public num: Number = 0;
  public count: number

  constructor(private productsService: ProductService) { }

  ngOnInit() {
    // let lenght = this.productsService.getCartProductsAll().length
    // console.log('ShoppingCartIconComponent - ngOnInit - num: ', lenght)
    // this.num = lenght
    this.productsService.currentCount.subscribe((count: number) => this.count = count)
  }

  // get count () {
  //   return this.productsService.getCartProductsAll().length
  // }
  // ngDoCheck() {

  // }
}
