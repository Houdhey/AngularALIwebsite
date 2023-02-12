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
    console.log('get firestore ', getFirestore());
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
      const database = getDatabase();
      const userToSave = {
        name: 'Houdheyfa',
        phone: '6599595',
        uid: 'ikURIzGJtQhzkWQ3o1MJVfvWImt2',
      };
      console.log('database ? ', database);
      set(ref(database, 'users/' + userToSave.uid), userToSave)
        .then((result) => console.log('set ref database ', result))
        .catch((error) => console.log('set ref error ', error))
        .finally(() => console.log('et bah alors'));

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
