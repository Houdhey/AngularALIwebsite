import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  logOut() {
    this.router.navigateByUrl('/login');
  }
}
