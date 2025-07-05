import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleAuthService } from '../../services/google.auth.service';
import { HttpClient } from '@angular/common/http'; // <-- Import HttpClient

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  showPassword = false;
  

  // Inject HttpClient as well
  constructor(
    private auth: AuthService,
    private router: Router,
    private googleAuth: GoogleAuthService,
    private http: HttpClient // <-- Add HttpClient injection here
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.error = '';
        localStorage.setItem('token', res.token); // keep for backend
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('auth_token', res.token); // ✅ important for header

        setTimeout(() => window.location.href = '/dashboard', 1000);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Login failed';
      }
    });
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
            window.location.href = '/dashboard';
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

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
