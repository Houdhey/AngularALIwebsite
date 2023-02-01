import { Component } from '@angular/core';
import { Auth, inMemoryPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router) {
    this.auth
      .setPersistence(inMemoryPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log('persistence set');
      })
      .catch((error) => {
        // Handle Errors here.
        console.log('error persistence ', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    this.auth.onAuthStateChanged((user) => {
      console.log('check user connected ', user);
      if (user) {
        console.log('User still connected');
        //this.router.navigateByUrl('/home');
      } else {
        console.log('User not connected');
        //this.router.navigateByUrl('/home');
      }
    });
  }
}
