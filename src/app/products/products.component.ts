import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductService) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }


}
