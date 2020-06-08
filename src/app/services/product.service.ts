import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartProducts: Product[] = []
  private countSource = new BehaviorSubject(0)
  public currentCount = this.countSource.asObservable()

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://www.mocky.io/v2/5cc95d2b310000db0c12ccb1');
  }

  getCartProductsAll(): Product[] {
    return this.cartProducts
  }
  addCartProduct(product: Product): Product {
    this.cartProducts.push(product)
    console.log('addCartProduct')
    console.log(this.cartProducts)

    this.updateCount()
    return product
  }
  
  updateCount() {
    this.countSource.next(this.cartProducts.length)
  }
  // deleteShoppingProductByName(name) {

  // }
}
