import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private firebaseAuth: Auth
  ) {}

  async canActivate(): Promise<boolean> {
    const backendLoggedIn = this.auth.isLoggedIn();

    const firebaseUser = this.firebaseAuth.currentUser || await new Promise((resolve) => {
      const unsub = this.firebaseAuth.onAuthStateChanged(user => {
        unsub();
        resolve(user);
      });
    });

    if (backendLoggedIn || firebaseUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
