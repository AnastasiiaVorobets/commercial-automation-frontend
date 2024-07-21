import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { AuthService } from '../../../services/auth.service'; // Імпортуємо AuthService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../../../models/sale.model';

@Component({
  selector: 'app-manage-sales',
  templateUrl: './manage-sales.component.html',
  styleUrls: ['./manage-sales.component.scss']
})
export class ManageSalesComponent implements OnInit {
  sales: Sale[] = [];
  saleForm: FormGroup;

  constructor(
    private saleService: SaleService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.saleForm = this.fb.group({
      product: ['', Validators.required],
      customer: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      saleDate: ['', Validators.required],
      deliveryDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getSales().subscribe((data: Sale[]) => {
      this.sales = data;
    });
  }

  addSale(): void {
    if (this.saleForm.valid) {
      this.saleService.createSale(this.saleForm.value).subscribe(() => {
        this.loadSales();
        this.saleForm.reset();
      });
    }
  }

  deleteSale(id: string): void {
    const currentUserId = this.authService.getUserId();
    console.log(`User with ID: ${currentUserId}`);
    this.saleService.deleteSale(currentUserId).subscribe(() => {
      this.loadSales();
    });
  }
}
