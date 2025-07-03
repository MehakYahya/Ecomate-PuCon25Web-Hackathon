import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet,CommonModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn = false;

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
    window.location.href = '/login'; // reload to force route update
  }
}