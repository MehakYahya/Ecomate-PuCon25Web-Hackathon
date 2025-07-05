import { Injectable } from '@angular/core';
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../../firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user: User | null) => {
      this.currentUserSubject.next(user);
    });
  }

  signIn() {
    return signInWithPopup(auth, provider);
  }

  signOut() {
    return signOut(auth);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}
