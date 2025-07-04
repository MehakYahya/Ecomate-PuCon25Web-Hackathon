import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  user: any = {};
  goalInput: number = 0;
  msg: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserProfile().subscribe({
      next: (data: any) => {
        this.user = data;
        this.goalInput = data.carbonGoal || 0;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.msg = 'Failed to load user data';
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

  // Progress as usage of goal
  if (footprint <= goal) {
    return Math.round((footprint / goal) * 100);
  }

  // If user exceeded goal, cap at 100%
  return 100;
}

}