import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service'; // Імпортуємо AuthService
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from '../../../models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      isPermanentCustomer: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.loadUsers();
        this.userForm.reset();
      });
    }
  }

  deleteUser(id: string): void {
    const currentUserId = this.authService.getUserId();
    this.userService.deleteUser(currentUserId).subscribe(() => {
      this.loadUsers();
    });
  }

  changeUserRole(id: string, role: UserRole): void {
    this.userService.changeUserRole(id, role).subscribe(() => {
      this.loadUsers();
    });
  }
}
