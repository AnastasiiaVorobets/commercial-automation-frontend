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
  discountThreshold: number = 5000;
  discountRate: number = 0.02;
  additionalDiscountThresholds: { threshold: number, rate: number }[] = [
    { threshold: 10000, rate: 0.03 },
    { threshold: 20000, rate: 0.05 }
  ];
  totalAmount: number = 0;
  originalAmount: number = 0;
  discountAmount: number = 0;
  isPermanentCustomer: boolean = false;
  appliedDiscountRate: number = 0;

  constructor(
    private cartService: CartService,
    private saleService: SaleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.isPermanentCustomer = this.authService.isPermanentCustomer();
    console.log('Is permanent customer:', this.isPermanentCustomer);
    this.updateAmounts();
  }

  loadCartItems(): void {
    this.items = this.cartService.getItems();
    console.log('Loaded cart items:', this.items);
    this.updateAmounts();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.items = [];
    this.totalAmount = 0;
    this.originalAmount = 0;
    this.discountAmount = 0;
    console.log('Cart cleared');
  }

  calculateDiscountRate(): number {
    let applicableDiscountRate = this.discountRate;

    for (const threshold of this.additionalDiscountThresholds) {
      if (this.originalAmount >= threshold.threshold) {
        applicableDiscountRate = threshold.rate;
      }
    }

    return applicableDiscountRate;
  }

  updateAmounts(): void {
    this.originalAmount = this.cartService.getTotalAmount();
    console.log('Original total amount:', this.originalAmount);

    if (this.isPermanentCustomer) {
      this.appliedDiscountRate = this.calculateDiscountRate();
      this.discountAmount = this.originalAmount * this.appliedDiscountRate;
      this.totalAmount = this.originalAmount - this.discountAmount;
      console.log(`Discount applied (rate: ${this.appliedDiscountRate * 100}%). New total amount:`, this.totalAmount);
    } else {
      this.discountAmount = 0;
      this.totalAmount = this.originalAmount;
    }
  }

  async checkout(): Promise<void> {
    if (this.items.length === 0) {
      this.message = 'Cart is empty!';
      console.log('Checkout failed: cart is empty');
      return;
    }

    const sale = this.createSale();

    console.log('Sale to be submitted:', sale);

    try {
      await this.saleService.createSale(sale).toPromise();
      this.message = 'Order placed successfully!';
      console.log('Order placed successfully');
      this.clearCart();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000);
    } catch (error) {
      console.error('Error placing order:', error);
      const typedError = error as { status?: number };
      if (typedError.status === 401) {
        this.message = 'You need to log in or register to complete the order.';
        console.log('Checkout failed: user needs to log in');
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
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
      totalAmount: this.totalAmount
    };
  }
}
