import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ModalOptions } from '@ionic/angular';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      }),
    });
  }

  async signIn() {
    console.log('signing in');
    try {
      if (!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      console.log(this.form.value);

      const response = await this.authService.signInWithPhoneNumber(
        '+33' + this.form.value.phone
      );
      console.log(response);

      const options: ModalOptions = {
        component: OtpComponent,
        componentProps: {
          phone: this.form.value.phone,
        },
        swipeToClose: true,
      };
      const modal = this.modalCtrl.create(options);
      (await modal).present();
      const data: any = (await modal).onWillDismiss();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
