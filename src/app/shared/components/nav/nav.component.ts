import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../interface/shared-interface';

import "bootstrap";

export class ExtendedNavItems {
  display: boolean = false;
  navItems: NavItem[] = []
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() mainNavItems: NavItem[] = []
  @Input() extendedNavItems: ExtendedNavItems = {display : false, navItems : []}
  constructor(
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKeyName: string,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/access");
  }

  

}
