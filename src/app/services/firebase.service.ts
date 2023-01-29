import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private auth: Auth) {}

  async registerUsingPhone(phone) {
    const applicationVerifier = new firebase.RecaptchaVerifier(
      'recaptcha-container'
    );

    applicationVerifier.render().then((widgetId) => {
      console.log('widget id ', widgetId);
    });
    const confirmationResult = await signInWithPhoneNumber(
      this.auth,
      phone,
      applicationVerifier
    )
      .then((confirmationResultat) =>
        console.log('confirmation result ', confirmationResultat)
      )
      .catch((error) => console.log('error sms'));

    console.log('confirmation resulttt ? ', confirmationResult);
  }
}
