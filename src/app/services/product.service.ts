import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {CartItem} from '../models/cartItem';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartItems: CartItem[] = []

  private countSource = new BehaviorSubject(0)
  public currentCount = this.countSource.asObservable()

  private totalAmountSource = new BehaviorSubject(0)
  public currentTotalAmount = this.totalAmountSource.asObservable()

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://www.mocky.io/v2/5cc95d2b310000db0c12ccb1')
      .pipe(
        tap(_ => {
          console.log('fetched products', _)
          localStorage.setItem('products', JSON.stringify(_))
        }),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }
  getCartItemsAll(): CartItem[] {
    // products from localStorage
    if (localStorage.getItem('cartItems')) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }
    this.updateObservable()
    return this.cartItems
  }
  addCartItem(product: Product): CartItem {

    let oldCartItem = this.cartItems.find(cartItem => cartItem.id === product.id)

    if (oldCartItem) {
      let quantity = oldCartItem.quantity + 1
      let price = oldCartItem.price
      let total = quantity * price
      oldCartItem.quantity = quantity
      oldCartItem.total = total

      this.updateObservable()
      return oldCartItem
    } else {
      
      let newCartItem: CartItem = {
        id: product.id,   
        name: product.name,
        imgUrl: product.imgUrl,
        description: product.description,
        price: product.price,
        quantity: 1,
        total: product.price
      }
      this.cartItems.push(newCartItem)
      this.updateObservable()
      return newCartItem
    }
  }
  removeCartItem(cartItem: CartItem): void {
    // remove whole product
    let index = this.cartItems.findIndex(ci => ci.id === cartItem.id)
    this.cartItems.splice(index, 1)

    // delete 1 quantity of cartItem
    // let oldCartItem = this.cartItems.find(ci => ci.id === cartItem.id)
    // if (oldCartItem.quantity === 1) {
    //   let index = this.cartItems.findIndex(ci => ci.id === cartItem.id)
    //   this.cartItems.splice(index, 1)
    // } else {
    //   oldCartItem.quantity = oldCartItem.quantity - 1
    //   oldCartItem.total = oldCartItem.quantity * oldCartItem.price
    // }
    this.updateObservable()
  }
  updateObservable() {
    this.updateCount()
    this.updateTotalAmount()
    this.saveCartItems()
  }
  
  updateCount() {
    let count = 0
    this.cartItems.forEach(cartItem => count+=cartItem.quantity)
    this.countSource.next(count)
  }
  updateTotalAmount() {
    let totalAmount = 0 
    this.cartItems.forEach(ci => {
      totalAmount += ci.total
    })
    this.totalAmountSource.next(totalAmount)
  }
  saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
