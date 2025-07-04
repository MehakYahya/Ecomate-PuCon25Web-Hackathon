import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet,CommonModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;
constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Check if token exists in localStorage
    const token = localStorage.getItem('auth_token');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
this.router.navigate(['/login']);
  }
}