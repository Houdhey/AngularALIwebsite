import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Auth, signInWithPhoneNumber } from '@angular/fire/auth';
import { WindowService } from '../../services/window.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  windowRef: any;
  verificationCode: string;
  user: any;

  constructor(private auth: Auth, private win: WindowService) {}

  ionViewDidEnter() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );

    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const userPhone = document.getElementById('userPhone') as HTMLInputElement;

    const num = userPhone.value;

    firebase
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log(error));
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        console.log('result verify ', result);
        this.user = result.user;
      })
      .catch((error) => console.log(error, 'Incorrect code entered?'));
  }

  async registerUsingPhone(phone) {
    const applicationVerifier = new firebase.auth.RecaptchaVerifier(
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
  connect() {
    const userPhone = document.getElementById('userPhone') as HTMLInputElement;

    this.registerUsingPhone(userPhone.value);
  }
}
