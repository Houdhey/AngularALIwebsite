import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  playing = false;

  constructor() {}

  volumeSlide() {
    const volumeee = document.getElementById('volume') as HTMLInputElement;
    console.log('changing volume ', volumeee.value);

    $('.mysong')[0].volume = volumeee.value;
  }
  powerClick() {
    /*alert('Use Round Button to play/pause the audio 🔘\nUse Slider to control volume 🎚️');*/
    $('.record').toggleClass('on');
    $('.stick').toggleClass('play');
    if (!this.playing) {
      this.playing = true;
      $('.mysong')[0].play();
    } else {
      $('.mysong')[0].pause();
      this.playing = false;
    }

    console.log('playing ? ' + this.playing);
  }
  ngOnInit(): void {}
}
