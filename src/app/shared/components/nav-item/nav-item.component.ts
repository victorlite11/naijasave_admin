import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavData } from '../../interface/shared-interface';

import "bootstrap";
@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() name: string = "";
  @Input() icon: string = "";
  @Input() display: boolean = true;
  @Input() navData: NavData = new NavData({destination : "", queryParams : {}});
  @Input() badge: {
    display: boolean,
    content: string | number
  } = {display : false, content : 0}

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate([this.navData.destination], {
      queryParams : this.navData.queryParams
    })
  }

}
