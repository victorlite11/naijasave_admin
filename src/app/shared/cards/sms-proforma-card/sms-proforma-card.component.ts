import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sms-proforma-card',
  templateUrl: './sms-proforma-card.component.html',
  styleUrls: ['./sms-proforma-card.component.scss']
})
export class SmsProformaCardComponent implements OnInit {
  @Input() for_?: string;
  @Input() message?: string;
  @Input() _id?: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['sms-proforma'], {relativeTo: this.route.parent, queryParams: {
      for: this.for_
    }});
  }

}
