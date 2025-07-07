import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserBadgesComponent } from '../../user-badges/user-badges.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, UserBadgesComponent ]
})
export class DashboardComponent implements OnInit {
  user: any = {};
  goalInput: number = 0;
  msg: string = '';

  constructor(private auth: AuthService,private router: Router) {}

  ngOnInit() {
    this.auth.getUserProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        this.goalInput = data.carbonGoal || 0;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.msg = 'Failed to load user data';
    this.router.navigate(['/login']);
      }
    });
  }
resetProgress() {
  this.auth.resetUserProgress().subscribe({
    next: (res: any) => {
      this.msg = res.message;
      this.user.currentFootprint = 0;
    },
    error: (err) => {
      console.error('Reset error:', err);
      this.msg = 'Failed to reset progress';
    }
  });
}
  updateGoal() {
    this.auth.updateCarbonGoal(this.goalInput).subscribe({
      next: (res: any) => {
        this.msg = res.message || 'Goal updated successfully!';
        this.user.carbonGoal = this.goalInput;
      },
      error: (err) => {
        console.error('Error updating goal:', err);
        this.msg = 'Failed to update goal.';
      }
    });
  }
getGoalProgress(): number {
  if (!this.user?.carbonGoal || this.user.carbonGoal === 0) return 0;

  const goal = this.user.carbonGoal;
  const footprint = this.user.currentFootprint || 0;

  // If user is saving carbon (negative footprint), calculate as progress
  if (footprint < 0) {
    const saved = Math.abs(footprint);
    const progress = Math.round((saved / goal) * 100);
    return Math.min(progress, 100); // Cap at 100%
  }

  // If user has positive footprint (used emissions)
  const progress = Math.round((footprint / goal) * 100);
  return Math.min(progress, 100);
}

showBadges = false;

toggleBadges() {
  this.showBadges = !this.showBadges;
}

}