import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TransactionSlipComponent } from 'src/app/shared/dialogs/transaction-slip/transaction-slip.component';
import { BasicTransactionModel } from 'src/app/shared/interface/shared-interface';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-admin-transaction-history',
  templateUrl: './admin-transaction-history.component.html',
  styleUrls: ['./admin-transaction-history.component.scss']
})
export class AdminTransactionHistoryComponent implements OnInit {
  title = "All Transactions History";
  transactionsHistory: BasicTransactionModel[] = [];

  fetchingHistory = true;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {

    let result: BasicTransactionModel[] = [];

    this.fetchingHistory = true;
    this.route.data.subscribe(async data => {

      if (data.admin_id) {
        await this.transactionsService.fetchHistory(data.admin_id).then(trxs => {
          trxs.forEach(h => {
            h.date = new Date(h.date).toDateString();
            result.push(h);
          });
          this.fetchingHistory = false
          this.transactionsHistory = result.reverse();
        })
      } else {
        await this.transactionsService.fetchAllHistory().then(trxs => {
          trxs.forEach(h => {
            h.date = new Date(h.date).toDateString();
            result.push(h);
          });
          this.fetchingHistory = false
          this.transactionsHistory = result.reverse();
        })
      }
    })
  }

  showTransactionSlip(transactionId: string) {
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.height = '36em';
    config.width = '29em';
    config.data = {transaction_id: transactionId};
    this.dialog.open(TransactionSlipComponent, config);
  }

}
