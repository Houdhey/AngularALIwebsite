import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber } from '@angular/fire/auth';
import firebase from 'firebase/compat';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private auth: Auth) {}

  registerUsingPhone(phone) {
    return signInWithPhoneNumber(this.auth, phone, new GoogleAuthProvider());
  }
}
