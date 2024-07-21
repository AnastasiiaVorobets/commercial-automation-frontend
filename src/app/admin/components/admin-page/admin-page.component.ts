import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
