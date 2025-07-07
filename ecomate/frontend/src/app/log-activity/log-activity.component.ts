import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-activity',
  standalone: true,
  templateUrl: './log-activity.component.html',
  styleUrls: ['./log-activity.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LogActivityComponent {
  activityType = '';
  amount: number | null = null;
  emission = 0;
  message = '';
  error = '';

  constructor(private auth: AuthService) {}

  calculateEmission() {
    const factors: Record<string, number> = {
      car: 0.2,             // per km
      bus: 0.1,
      bike: -0.05,
      walk: -0.05,
      tree: -21,            // per tree
      electricity: 0.4,     // per kWh
      meatless: -2.5,       // per meal
      recycling: -1         // per kg
    };

    if (!(this.activityType in factors)) {
      this.emission = 0;
      return;
    }

    this.emission = +(this.amount ?? 0) * factors[this.activityType];
  }

  logActivity() {
    if (!this.activityType || this.amount == null || this.amount <= 0) {
      this.error = 'Please select an activity type and enter a valid amount.';
      this.message = '';
      return;
    }

    this.calculateEmission();

    const activity = {
      type: this.activityType,
      amount: this.amount,
      emission: this.emission
    };

    this.auth.logActivity(activity).subscribe({
      next: () => {
        this.message = '✅ Activity logged successfully!';
        this.error = '';
        this.amount = null;
        this.activityType = '';
        this.emission = 0;
      },
      error: err => {
        this.error = err.error?.message || 'Error logging activity';
        this.message = '';
      }
    });
  }
}
