import { Component } from '@angular/core';
import { Auth, inMemoryPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getDatabase } from 'firebase/database';
import { ref, set } from '@angular/fire/database';
import { getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router) {
    this.auth.setPersistence(inMemoryPersistence).catch((error) => {
      // Handle Errors here.
      console.log('error persistence ', error);
    });

    this.auth.onAuthStateChanged((user) => {
      console.log('check user connected ', user);
      const database = getDatabase();

      if (user) {
        const userToSave = {
          name: 'Houdheyfa',
          phone: user.phoneNumber,
          uid: user.uid,
        };
        console.log('User still connected', user.uid);
        set(ref(database, 'users/' + userToSave.uid), userToSave)
          .then((result) => console.log('set ref database ', result))
          .catch((error) => console.log('set ref error ', error));
        //this.router.navigateByUrl('/home');
      } else {
        console.log('User not connected');
        //this.router.navigateByUrl('/home');
      }
    });
  }
}
