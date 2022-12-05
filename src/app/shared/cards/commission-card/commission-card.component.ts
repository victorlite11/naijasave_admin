import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BottomSheetData, BottomSheetSwitch } from '../../components/bottom-sheet/bottom-sheet.component';
import { OperationFeedback } from '../../interface/shared-interface';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-commission-card',
  templateUrl: './commission-card.component.html',
  styleUrls: ['./commission-card.component.scss']
})
export class CommissionCardComponent implements OnInit {
  @Input() name?: string;
  @Input() balance?: number;
  @Input() overseer_id?: string;
  @Output("madePayment") madePayment : EventEmitter<OperationFeedback> = new EventEmitter();
  @Output("makePayment") makePayment : EventEmitter<{name: string, balance: number, overseer_id: string}> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateToContributorDashboard() {
    if(!this.overseer_id) {
      return;
    }

    this.router.navigate(['contributor'],{relativeTo: this.route.parent, queryParams: {contributor_id: this.overseer_id as string}})
  }

  async pay() {
    this.makePayment.emit({
      name: this.name as string,
      balance: this.balance as number,
      overseer_id: this.overseer_id as string
    })
  }

}
