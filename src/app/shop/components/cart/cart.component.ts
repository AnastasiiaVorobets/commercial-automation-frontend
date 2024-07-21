import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { SaleService } from '../../../services/sale.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from '../../../models/product.model';
import { Sale } from '../../../models/sale.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: { product: Product, quantity: number }[] = [];
  message: string = '';

  constructor(
    private cartService: CartService,
    private saleService: SaleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    console.log(localStorage.getItem('token'));
  }

  loadCartItems(): void {
    this.items = this.cartService.getItems();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
  }

  getTotalAmount(): number {
    return this.cartService.getTotalAmount();
  }

  async checkout(): Promise<void> {
    if (this.items.length === 0) {
      this.message = 'Cart is empty!';
      return;
    }

    const sale = this.createSale();

    console.log('Sale to be submitted:', sale);

    try {
      await this.saleService.createSale(sale).toPromise();
      this.message = 'Order placed successfully!';
      this.clearCart();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    } catch (error) {
      console.error('Error placing order:', error);
      const typedError = error as { status?: number };
      if (typedError.status === 401) {
        this.message = 'You need to log in or register to complete the order.';
        setTimeout(() => {
          this.router.navigate(['/auth/register']);
        }, 5000);
      } else {
        this.message = 'Error placing order. Please try again.';
      }
    }
  }

  private createSale(): Sale {
    const saleDate = new Date();
    const deliveryDate = new Date(saleDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    return {
      _id: '',
      product: this.items.map(item => item.product._id),
      user: this.authService.getUserId(),
      saleDate: saleDate,
      deliveryDate: deliveryDate,
      quantity: this.items.reduce((total, item) => total + item.quantity, 0),
      totalAmount: this.getTotalAmount()
    };
  }
}
