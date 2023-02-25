import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.scss'],
})
export class Navbar3Component implements OnInit {
  constructor() {}

  ngOnInit() {}

  bizarre() {
    let previous = -1;
    $('.icon[data-index]').click(() => {
      $(this).addClass('initialised');
      const index = $(this).attr('data-index');
      const navtab = $(this)
        .closest('nav.tab')
        .addClass('moving')
        .attr('data-selected', index);
      if (previous === -1) {
        navtab.find('.icon[data-index="2"]').addClass('initialised');
      }
      if ((previous === 1 && index === 3) || (previous === 3 && index === 1)) {
        //If going from one side to the other and middle needs to be hidden
        navtab.find('.icon[data-index="2"]').removeClass('initialised');
        setTimeout(() => {
          //Because apparently this is the only way it will work
          navtab.find('.icon[data-index="2"]').addClass('initialised'); //Same animation as the other so they line up
        });
      }
      previous = index;
      setTimeout(() => {
        navtab.removeClass('moving').removeClass('hidemiddle');
      }, 750);
    });
    /*🤢 If someone knows how to sort out the animations in a non-garbage way please fork and mention in a comment, I kinda got stuck.*/
  }
}
