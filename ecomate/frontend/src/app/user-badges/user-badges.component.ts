import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-badges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.css']
})
export class UserBadgesComponent implements OnInit {
  badges: any[] = [];
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBadges();
  }

fetchBadges() {
  const token = localStorage.getItem('auth_token'); // Use your key here

  if (!token) {
    this.error = 'User is not logged in.';
    return;
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  this.http.get<any[]>('http://localhost:5000/api/badges/my', { headers }).subscribe({
    next: (res) => {
          console.log('Badges response:', res); // Add this

      this.badges = res;
    },
    error: (err) => {
      this.error = 'Failed to load badges';
      console.error(err);
    }
  });

  }
}
