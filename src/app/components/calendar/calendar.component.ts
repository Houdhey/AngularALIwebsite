import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const c = setTimeout(() => {
      document.body.classList.remove('not-loaded');
      clearTimeout(c);
    }, 1000);
  }
}
