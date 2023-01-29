import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  connect() {
    const userPhone = document.getElementById('userPhone') as HTMLInputElement;
    this.firebaseService.registerUsingPhone(userPhone.value);
  }
}
