import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleAuthService } from '../../services/google.auth.service';
import { HttpClient } from '@angular/common/http'; // <-- Import HttpClient

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  error = '';
  success = '';
redirecting = false;
  constructor(private auth: AuthService, private router: Router, private googleAuth: GoogleAuthService,
      private http: HttpClient ) {}
showPassword = false;
showConfirmPassword = false;
passwordMismatch = false;

 toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }
togglePassword() {
  this.showPassword = !this.showPassword;
}

  register() {
    if (this.passwordMismatch) {
      this.error = 'Passwords do not match';
      return;
    }
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.success = 'Registration successful!';
        this.error = '';
        this.redirecting = true;  // Show animation

        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.error = err.error.message || 'Registration failed';
        this.success = '';
        this.redirecting = false;
      }
    });
  }
    goToLogin() {
    this.router.navigate(['/login']);
  }
   googleLogin() {
    this.googleAuth.signIn()
      .then(async (result) => {
        const user = result.user;
        // Get Firebase ID token for this user
        const idToken = await user.getIdToken();

        // Send Firebase ID token to your backend to verify and get your own JWT
        this.http.post<{ token: string; user: any }>(
           'http://localhost:5000/api/users/google-login',
          { idToken }
        ).subscribe({
          next: (res: any) => {
            localStorage.setItem('auth_token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
this.router.navigate(['/login']);
          },
          error: (err: any) => {
            this.error = err.error?.message || 'Google login failed';
          }
        });
      })
      .catch((error: any) => {
        this.error = error.message;
      });
  }

} 