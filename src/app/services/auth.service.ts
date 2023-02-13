import { Injectable } from '@angular/core';
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  inMemoryPersistence,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  appVerifier: any;
  confirmationResult: any;

  userPrenom;
  userNom;

  constructor(
    private auth: Auth,
    private router: Router,
    public modalCtrl: ModalController
  ) {}

  recaptcha() {
    this.appVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          console.log(response);
        },
        'expired-callback': () => {},
      },
      this.auth
    );
  }
  async signInWithPhoneNumber(phoneNumber) {
    try {
      if (!this.appVerifier) {
        this.recaptcha();
      }
      const confirmationResult = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        this.appVerifier
      );
      this.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (e) {
      throw e;
    }
  }
  /*  signInWithPhoneNumber(phoneNumber) {
    const userPhone = document.getElementById('userPhone') as HTMLInputElement;
    try {
      if (!this.appVerifier) {
        this.recaptcha();
      }
      setPersistence(this.auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.

          return signInWithPhoneNumber(
            this.auth,
            phoneNumber,
            this.appVerifier
          );
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (e) {
      throw e;
    }
  }*/

  async verifyOtp(otp) {
    try {
      if (!this.appVerifier) {
        this.recaptcha();
      }
      const result = await this.confirmationResult.confirm(otp);
      console.log('verify otp confirmation result ', result);
      const user = result?.user;
      // If user.uid -> aller a la route suivante, sinon, retourner à l'accueil
      //Toaster de message d'erreur
      if (user.uid) {
        console.log('user connected ');
        this.router.navigateByUrl('/home');
        this.modalCtrl.dismiss();
      }
      console.log('utilisateur ?  ', user);
    } catch (e) {
      console.log('error verify otp ? ', e);
    }
  }

  signOut() {
    signOut(this.auth);
  }
}
