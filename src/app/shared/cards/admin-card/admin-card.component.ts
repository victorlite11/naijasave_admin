import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {
  @Input() name?: string;
  @Input() username?: string;
  @Input() admin_id?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToAdminDashboard() {
    if(!this.admin_id) {
      return;
    }
    this.router.navigate(['admin'], {relativeTo: this.route.parent, queryParams: {
      admin_id: this.admin_id
    }});
  }

}
