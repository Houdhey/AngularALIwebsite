import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  lottieConfig;

  constructor(private router: Router) {
    this.lottieConfig = {
      path: 'assets/lotties/scanner.json',
      autoplay: true,
      loop: true,
    };
  }

  ngOnInit() {}

  logOut() {
    this.router.navigateByUrl('/login');
  }
}
