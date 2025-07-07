import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  initialized = false; // <- Add this

  constructor(private router: Router) {}

  ngOnInit() {
    // ✅ Check login status on every route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });

    // Initial check
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('auth_token');
    const currentRoute = this.router.url;
    this.isLoggedIn = !!token && !['/login', '/register'].includes(currentRoute);
        this.initialized = true; // <- Now allow rendering

  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
