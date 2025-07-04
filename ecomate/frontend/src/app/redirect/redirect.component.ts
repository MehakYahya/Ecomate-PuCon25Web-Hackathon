import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: `<p>Redirecting...</p>`
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('auth_token');

    if (token) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']); // 👈 not register
    }
  }
}
