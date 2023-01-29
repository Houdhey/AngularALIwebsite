import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @Input() phone;
  isLoading = false;
  otp: string;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style',
  };

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  onOtpChange(event) {
    this.otp = event;
    console.log('OTP changed !! ', this.otp);
  }

  async verifyOtp() {
    try {
      const response = await this.auth.verifyOtp(this.otp);
      console.log('verify otp response ', response);
    } catch (e) {
      console.log('verify otp error ', e);
    }
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber(
        '+33' + this.phone
      );
      console.log('resend response  ', response);
    } catch (e) {
      console.log('resend error ', e);
    }
  }
}
