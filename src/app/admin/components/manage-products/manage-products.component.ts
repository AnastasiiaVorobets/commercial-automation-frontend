import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.productForm.reset();
      });
    }
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
