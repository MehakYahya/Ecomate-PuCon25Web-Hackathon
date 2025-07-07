import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-community-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-prediction.component.html',
  styleUrls: ['./community-prediction.component.css']
})
export class CommunityPredictionComponent implements OnInit {
  @Input() communityId!: string;

  prediction: any;
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
      console.log('🟢 Community ID:', this.communityId); // <-- Add this

    this.fetchPrediction();
  }
 fetchPrediction() {
    this.loading = true;
    this.http.get<any>(`http://localhost:5000/api/communities/${this.communityId}/predict-impact`)
      .subscribe({
        next: (res) => {
          this.prediction = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Prediction fetch failed';
          this.loading = false;
        }
      });
  }
  getProgressPercentage(): string {
  if (!this.prediction || this.prediction.goalKgCO2 === 0) return '0.0';
  const percent = (this.prediction.predictedReductionKgCO2 / this.prediction.goalKgCO2) * 100;
  return percent.toFixed(1);
}

}
