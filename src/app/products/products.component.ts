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
    // products from localStorage
    let localProducts = []
    if (localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
    }
    if (localProducts.length !== 0) {
      console.log('products localStorage', localProducts)
      this.products = localProducts
      
    // products from server  
    } else {
      this.productsService.getProducts().subscribe(products => this.products = products);
    }
  }
}
