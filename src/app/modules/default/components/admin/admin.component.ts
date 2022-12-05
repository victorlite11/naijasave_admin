import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionSlipComponent } from 'src/app/shared/dialogs/transaction-slip/transaction-slip.component';
import { BasicTransactionModel } from 'src/app/shared/interface/shared-interface';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin = new AdminModel()

  transactionsHistory : BasicTransactionModel[] = []

  accountType = "";
  balanceAwayTitle = "Balance Away";
  balanceAwayValue = "";

  fetchingAdminData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private location: Location,
    public dialog: MatDialog,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.fetchingAdminData = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.admin_id) {
        this.route.data.subscribe(
          async data => {
            this.admin = await this.adminService.getAdmin(data.admin_id);
            await this.fetchTransactions(data.admin_id);

            this.fetchingAdminData = false;
            this.balanceAwayValue = "N" + this.admin.account?.balanceAway;
            // define accountType
            this.defineAccountType();
    
          }
        )
      } else {
        this.admin = await this.adminService.getAdmin(query.admin_id);
        this.fetchingAdminData = false;
        this.balanceAwayValue = "N" + this.admin.account?.balanceAway;
        // define accountType
        this.defineAccountType();
      }
    })
  }

  async fetchTransactions(admin_id : string) {
    let result: BasicTransactionModel[] = [];

    await this.transactionsService.fetchHistory(admin_id).then(trxs => {
      trxs.forEach(h => {
        h.date = new Date(h.date).toDateString();
        result.push(h);
      });

      this.transactionsHistory = result.reverse().slice(0,8);
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

  navigateBack() {
    this.location.back()
  }

  defineAccountType() {
    if(this.admin.identity?.isHeadAdmin) {
      this.accountType = "Head Admin";
    } else if(this.admin.identity?.isSuperAdmin) {
      this.accountType = "Super Admin";
    } else if(this.admin.identity?.isSubAdmin) {
      this.accountType = "Sub Admin";
    } else {
      this.accountType = "Unknown";
    }
  }

  navigateToCompanyProfile() {
    this.router.navigate(['company-profile'], {relativeTo: this.route, queryParams: {
      username: this.admin.credentials?.username
    }});
  }

  navigateToAdminsPortal() {
    this.router.navigate(['admins'], {relativeTo: this.route});
  }

  navigateToContributorsPortal() {
    this.router.navigate(['contributors-portal'], {relativeTo: this.route});
  }

  navigateToAdminIdentity() {
    this.route.data.subscribe(data => {
     sessionStorage.setItem('admin_id',data.admin_id);
     this.router.navigate(['admin-identity'], {relativeTo: this.route.parent, queryParams: {
      admin_id: this.admin._id
     }});
   });
  }

  navigateToAdminPrivilege() {
    this.route.data.subscribe(data => {
     sessionStorage.setItem('admin_id',data.admin_id);
     this.router.navigate(['admin-privilege'], {relativeTo: this.route.parent, queryParams: {
       admin_id: this.admin._id
     }});
    });
  }

  navigateToInteraccount() {
    this.router.navigate(['interaccount'], {relativeTo: this.route});
  }

  navigateToAdminsInteraccount() {
    this.router.navigate(['admin-interaccount'], {relativeTo: this.route});
  }

  navigateToRequests() {
    this.router.navigate(['requests'], {relativeTo: this.route});
  }

  navigateToAllTransactions() {
    this.router.navigate(['all-transactions'], {relativeTo: this.route.parent, queryParams : {
      admin_id: this.admin._id
    }});
  }

  navigateToAnnouncements() {
    this.router.navigate(['announcements'], {relativeTo: this.route});
  }

  navigateToPersonalData() {
    this.router.navigate(['admin-personal-data'], {relativeTo: this.route.parent, queryParams: {
      admin_id: this.admin._id
    }});
  }

}

