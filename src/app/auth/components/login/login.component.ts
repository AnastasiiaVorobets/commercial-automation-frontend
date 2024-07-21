import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res && res.user) {
            const userRole = res.user.role;
            if (userRole === 'customer') {
              this.router.navigate(['/shop']);
            } else {
              this.router.navigate(['/admin']);
            }
          } else {
            this.errorMessage = 'Invalid response from server';
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
