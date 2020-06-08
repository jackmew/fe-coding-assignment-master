import {Component, Input} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product;

  constructor(private productsService: ProductService) {
  }

  addToCart() {
    // TODO - implement adding of product to cart
    console.log('addToCart')
    // console.log(this.product)
    this.productsService.addCartProduct(this.product)
  }
}
