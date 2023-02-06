import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-dynamic',
  templateUrl: './nav-bar-dynamic.component.html',
  styleUrls: ['./nav-bar-dynamic.component.scss'],
})
export class NavBarDynamicComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  clickZakat() {
    const house = document.getElementById('icon-1') as HTMLInputElement;
    const person = document.getElementById('icon-2') as HTMLInputElement;
    const mail = document.getElementById('icon-3') as HTMLInputElement;
    const star = document.getElementById('icon-4');
    const bell = document.getElementById('icon-5');
    const activated = document.getElementById('activated') as HTMLInputElement;

    activated.style.left = '15%';

    house.style.top = '10%';
    house.style.width = '60px';
    house.style.height = '60px';

    person.style.top = '50%';
    person.style.width = '40px';
    person.style.height = '40px';

    mail.style.top = '50%';
    mail.style.width = '40px';
    mail.style.height = '40px';

    star.style.top = '50%';
    star.style.width = '40px';
    star.style.height = '40px';

    bell.style.top = '50%';
    bell.style.width = '40px';
    bell.style.height = '40px';

    activated.style.transitionDuration = '0.7s';
    house.style.transitionDuration = '0.7s';

    this.router.navigateByUrl('/cotisations');
  }

  clickProfile() {
    const house = document.getElementById('icon-1') as HTMLInputElement;
    const person = document.getElementById('icon-2') as HTMLInputElement;
    const mail = document.getElementById('icon-3') as HTMLInputElement;
    const star = document.getElementById('icon-4');
    const bell = document.getElementById('icon-5');
    const activated = document.getElementById('activated') as HTMLInputElement;

    activated.style.left = '85%';

    house.style.top = '50%';
    house.style.width = '40px';
    house.style.height = '40px';

    person.style.top = '50%';
    person.style.width = '40px';
    person.style.height = '40px';

    mail.style.top = '50%';
    mail.style.width = '40px';
    mail.style.height = '40px';

    star.style.top = '50%';
    star.style.width = '40px';
    star.style.height = '40px';

    bell.style.top = '10%';
    bell.style.width = '60px';
    bell.style.height = '60px';

    activated.style.transitionDuration = '0.7s';
    bell.style.transitionDuration = '0.7s';
  }

  clickScanner() {
    const house = document.getElementById('icon-1') as HTMLInputElement;
    const person = document.getElementById('icon-2') as HTMLInputElement;
    const mail = document.getElementById('icon-3') as HTMLInputElement;
    const star = document.getElementById('icon-4');
    const bell = document.getElementById('icon-5');
    const activated = document.getElementById('activated') as HTMLInputElement;

    activated.style.left = '50%';

    house.style.top = '50%';
    house.style.width = '40px';
    house.style.height = '40px';

    person.style.top = '50%';
    person.style.width = '40px';
    person.style.height = '40px';

    mail.style.top = '10%';
    mail.style.width = '60px';
    mail.style.height = '60px';

    star.style.top = '50%';
    star.style.width = '40px';
    star.style.height = '40px';

    bell.style.top = '50%';
    bell.style.width = '40px';
    bell.style.height = '40px';

    activated.style.transitionDuration = '0.7s';
    mail.style.transitionDuration = '0.7s';
    this.router.navigateByUrl('/home');
  }
}
