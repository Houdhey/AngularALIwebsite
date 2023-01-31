import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      console.log('check user connected ', user);
      if (user) {
        console.log('User still connected');
        this.router.navigateByUrl('/home');
      } else {
        console.log('User not connected');
        this.router.navigateByUrl('/login');
      }
    });
  }
}
