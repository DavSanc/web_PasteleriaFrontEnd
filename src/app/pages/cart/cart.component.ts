import { Component } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];
  cartIcon = faTrashCan;

  ngOnInit(): void {
    const cartStorage = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')!)
      : [];
    this.cart = cartStorage;
    console.log(this.cart);
  }

  subtractQuantity(product: any) {
    this.cart = this.cart
      .map((item) => {
        if (item._id === product._id) {
          if (item.quantity > 0) {
            item.quantity -= 1;
            item.total = item.price * item.quantity;
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addQuantity(product: any) {
    this.cart = this.cart.map((item) => {
      if (item._id === product._id) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
          item.total = item.price * item.quantity;
        }
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  removeToCart(_id: string) {
    this.cart = this.cart.filter((item) => {
      return item._id !== _id;
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  totalPrice() {
    const prices = this.cart.map((item) => {
      return item.total;
    });
    console.log(prices);

    const initialValue = 0;
    const sumWithInitial = prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    return sumWithInitial;
  }

}
