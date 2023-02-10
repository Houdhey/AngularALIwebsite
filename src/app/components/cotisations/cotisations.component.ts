import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-cotisations',
  templateUrl: './cotisations.component.html',
  styleUrls: ['./cotisations.component.scss'],
})
export class CotisationsComponent implements OnInit {
  swiper;
  months = [
    {
      id: '1',
      name: 'January',
    },
    {
      id: '2',
      name: 'February',
    },
    {
      id: '3',
      name: 'March',
    },
    {
      id: '4',
      name: 'April',
    },
    {
      id: '5',
      name: 'May',
    },
    {
      id: '6',
      name: 'June',
    },
    {
      id: '7',
      name: 'July',
    },
    {
      id: '8',
      name: 'August',
    },
    {
      id: '9',
      name: 'September',
    },
    {
      id: '10',
      name: 'October',
    },
    {
      id: '11',
      name: 'November',
    },
    {
      id: '12',
      name: 'December',
    },
  ];
  constructor() {}

  ngOnInit() {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  onClickMonth(month) {
    console.log('month clicked ? ', month);
    this.swiper.slideTo(month - 1);
    console.log(this.swiper.activeIndex);
    if (this.swiper.activeIndex === month - 1) {
      console.log('current index ');
    }
  }
}
