import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbarnew',
  templateUrl: './navbarnew.component.html',
  styleUrls: ['./navbarnew.component.scss'],
})
export class NavbarnewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  clickIcon(dataIndex) {
    let previous = -1;
    $('.icon[${dataIndex}]').addClass('initialised');
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
  }
}
