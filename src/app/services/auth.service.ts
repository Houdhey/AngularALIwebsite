import { Injectable } from '@angular/core';
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  appVerifier: any;
  confirmationResult: any;

  constructor(private auth: Auth) {}

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
    const userPhone = document.getElementById('userPhone') as HTMLInputElement;

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
      console.log('utilisateur ?  ', user);
    } catch (e) {
      console.log('error verify otp ? ', e);
    }
  }
}
