import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-cotisations',
  templateUrl: './cotisations.component.html',
  styleUrls: ['./cotisations.component.scss'],
})
export class CotisationsComponent implements OnInit {
  appendNumber = 600;
  prependNumber = 1;

  swiper;
  images: Array<object> = [
    {
      src: 'https://loremflickr.com/g/600/400/paris',
      alt: 'Image 1',
    },
    {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 2',
    },
    {
      src: 'https://loremflickr.com/600/400/paris,girl/all',
      alt: 'Image 3',
    },
    {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 4',
    },
    {
      src: 'https://loremflickr.com/600/400/paris,girl/all',
      alt: 'Image 5',
    },
    {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 6',
    },
  ];
  constructor() {}

  ngOnInit() {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      virtual: {
        slides: (() => {
          const slides = [];
          for (let i = 0; i < 10; i += 1) {
            slides.push('Slide ' + (i + 1));
          }
          return slides;
        })(),
      },
    });
  }
}
