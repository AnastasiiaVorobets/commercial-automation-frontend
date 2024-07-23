import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';
  private items: { product: Product, quantity: number }[] = [];

  constructor() {
    this.loadItemsFromStorage();
  }

  private loadItemsFromStorage(): void {
    const savedItems = localStorage.getItem(this.storageKey);
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    }
  }

  private saveItemsToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addToCart(product: Product): void {
    const existingItem = this.items.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveItemsToStorage();
  }

  getItems(): { product: Product, quantity: number }[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    this.saveItemsToStorage();
  }

  getTotalAmount(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
