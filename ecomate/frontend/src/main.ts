import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './app/services/token.interceptor';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { firebaseApp } from './firebase';  // <-- Import your firebaseApp

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // Firebase initialization with your config
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => getAuth(firebaseApp)),

    // Token interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
});
