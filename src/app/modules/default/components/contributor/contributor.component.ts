import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DepositComponent } from 'src/app/shared/dialogs/deposit/deposit.component';
import { WithdrawComponent } from 'src/app/shared/dialogs/withdraw/withdraw.component';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

import { ChangeDailyDepositComponent } from 'src/app/shared/dialogs/change-daily-deposit/change-daily-deposit.component';

import { ContributorAccountSummary, ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { TickerService } from 'src/app/shared/services/tick/ticker.service';
import Swal from 'sweetalert2';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';
import { WithdrawalService } from 'src/app/shared/services/withdrawal/withdrawal.service';
import { DepositService } from 'src/app/shared/services/deposit/deposit.service';
import { BasicTransactionModel, SearchSelection } from 'src/app/shared/interface/shared-interface';
import { TransactionSlipComponent } from 'src/app/shared/dialogs/transaction-slip/transaction-slip.component';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss']
})
export class ContributorComponent implements OnInit {
  // contributor
  contributor = new ContributorModel();
  fetchingContributor = true;
  accountType: string = "unknown";

  moreless = "More";
  more : boolean = false;

  // ticks
  tickCalendar = {
    monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
    year: new Date().getFullYear(),
    month: (new Date().getMonth() + 1)
  }

  // subordinates
  countingSubordinates = false;
  totalSubordinates = 0;
  subContributorsCount = 0;
  contributorsCount = 0;
  investorsCount = 0;

  // requests
  fetchingRequests = true;
  depositRequests = 0;
  withdrawalRequests = 0;

  // announcements
  fetchingAnnouncements = false;
  announcements = []

  // transaction history
  transactionsHistory: BasicTransactionModel[] = [];

  // accountSummary
  accountSummary = new ContributorAccountSummary()
  

  isWithindepositChangeableDays: boolean = false;
  authKeyName: string
  constructor(
    private tickerService: TickerService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private compService: CompanyService,
    private contributorsService: ContributorsService,
    private subordinatesService: SubordinatesService,
    private depositService: DepositService,
    private location : Location,
    private transactionsService : TransactionsService,
    private withdrawalService: WithdrawalService,
    @Inject('SEARCH_SELECTION_KEY') private searchSelectionKey: string,
    @Inject('AUTH_KEY_PROPERTY_NAME') authKeyName: string
  ) { 
    this.authKeyName = authKeyName;
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.route.queryParams.subscribe(async d => {
          this.contributor = await this.contributorsService.getContributor(d.contributor_id);
          this.fetchingContributor = false;
          
          // define accountType
          this.defineAccountType();

          // account summary
          this.accountSummary = await this.transactionsService.getContributorAcccountSummary(this.contributor._id as string)

  
          // add functions below
          await this.drawTicks();
          
          // history
         await this.fetchTransactions(this.contributor._id as string);
    })
  }

  async fetchTransactions(contributorId : string) {
    let result: BasicTransactionModel[] = [];

    await this.transactionsService.fetchHistory(contributorId).then(trxs => {
      trxs.forEach(h => {
        h.date = new Date(h.date).toDateString();
        result.push(h);
      });
      this.transactionsHistory = result.reverse().slice(0,5);

    })
  }
 
  async drawTicks() {
    let container = document.getElementsByClassName('tick-host-container')[0];
    this.tickerService.drawTick({
      paymentTicks: this.contributor.paymentTicks!!,
      tickContainer: container as HTMLDivElement, 
      year: this.tickCalendar.year, month: this.tickCalendar.month});

  }

  moveForward() {
    // can just go back month without checking
    if(this.tickCalendar.month == 12) {

      // change year as well
      this.tickCalendar.month = 1;
      this.tickCalendar.year += 1;

    } else {
      this.tickCalendar.month += 1;
    }
    let container = document.getElementsByClassName('tick-host-container')[0];
    this.tickerService.drawTick({
      paymentTicks: this.contributor.paymentTicks!!, year: this.tickCalendar.year,
      month: this.tickCalendar.month, tickContainer: container as HTMLDivElement
    })
  }

  
  moveBack() {
    let dt = new Date(this.contributor.activities!!.regDate);

    if(this.tickCalendar.year > dt.getFullYear()) {
      // can just go back month without checking
      if(this.tickCalendar.month == 1) {
        // change year as well
        this.tickCalendar.month = 12;
        this.tickCalendar.year -= 1;
      } else {
        this.tickCalendar.month -= 1;
      }
    } else {
      if(this.tickCalendar.month > (dt.getMonth() + 1)) {
        // can just go back month without checking
        if(this.tickCalendar.month == 1) {
          // change year as well
          this.tickCalendar.month = 12;
          this.tickCalendar.year -= 1;
        } else {
          this.tickCalendar.month -= 1;
        }
      }
    }

    let container = document.getElementsByClassName('tick-host-container')[0];
    this.tickerService.drawTick({
      paymentTicks: this.contributor.paymentTicks!!, year: this.tickCalendar.year,
      month: this.tickCalendar.month, tickContainer: container as HTMLDivElement
    })
  }

  navigateBack() {
    this.location.back()
  }

  defineAccountType() {
    if(this.contributor.identity?.isInvestor) {
      this.accountType = "Investor";
    } else if(this.contributor.identity?.isContributor) {
      this.accountType = "Contributor";
    } else if(this.contributor.identity?.isSubContributor) {
      this.accountType = "Sub Contributor";
    } else {
      this.accountType = "Super Contributor";
    }
  }

  deposit() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.height = '30em';
    config.width = '99%';
    config.data = {
      contributor_id: this.contributor._id, 
      overseer_id: this.contributor.basicInformation?.overseerId,
      dailySavings: this.contributor.account?.dailySavings,
      name: this.contributor.basicInformation?.name
    }
    let dialog = this.dialog.open(DepositComponent, config);
    dialog.afterClosed().subscribe((result: {success: boolean, message: string}) => {
      if(result.success) {
        Swal.fire({title: "Successful", text: result.message, icon: "success", width: "70%", position: "center"});
      } else {
        Swal.fire({title: "Not Successful", text: result.message, icon: "error", width: "70%", position: "center"});
      }
    })
  }

  withdraw() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '99%';
    config.height = '43em';
    config.autoFocus = true;
    config.data = {
      contributor_id: this.contributor._id, 
      overseer_id: this.contributor.basicInformation?.overseerId,
      name: this.contributor.basicInformation?.name,
      bankDetails: this.contributor.account?.bankDetails
    }
    let dialog = this.dialog.open(WithdrawComponent, config);
    dialog.afterClosed().subscribe((result: {success: boolean, message: string}) => {
      if(result.success) {
        Swal.fire({title: "Successful", text: result.message, icon: "success", width: "70%", position: "center"});
      } else {
        Swal.fire({title: "Not Successful", text: result.message, icon: "error", width: "70%", position: "center"});
      }
    })
  }


  toggleMoreLess() {
    this.more = !this.more
    this.moreless = this.more ? "Less" : "More"
  }


  openSubContributors() {
    this.navigateToSubordinates("sub-contributors");
  }

  openContributors() {
    this.navigateToSubordinates("contributors");
  }

  openInvestors() {
    this.navigateToSubordinates("investors");
  }
 
  navigateToSubordinates(identity: "sub-contributors" | "contributors" | "investors") {
    this.router.navigate(['subordinates'],{relativeTo: this.route, state: {contributor_id: this.contributor._id, identity: identity}});
  
  }

  openAnnouncements() {
    this.router.navigate(['announcements'],{relativeTo: this.route, state: {identity: this.contributor.identity as string}});
  }

  navigateToInteraccountComponent() {
    sessionStorage.setItem(this.searchSelectionKey, JSON.stringify(<SearchSelection> {
      contributorId: this.contributor._id,
      phoneNumber : this.contributor.credentials?.phoneNumber,
      name: this.contributor.basicInformation?.name
    }))
    this.router.navigate(['interaccount'], {relativeTo: this.route.parent, queryParams: {
        contributor_id: this.contributor._id, 
        overseer_id: this.contributor.basicInformation?.overseerId
      }
    });
  }

  openWithdrawalRequests() {
    this.router.navigateByUrl('/withdrawalrequests')
  }

  openDepositRequests() {
    this.router.navigateByUrl('/depositrequests');
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

  navigateToWithdrawSavings() {
    this.router.navigate(['withdraw-savings'], {relativeTo: this.route, state: {
      contributor_id: this.contributor._id, 
      overseer_id: this.contributor.basicInformation?.overseerId,
      name: this.contributor.basicInformation?.name,
      bankDetails: this.contributor.account?.bankDetails,
      balance: this.contributor.account?.balance
    }
  });
  }

  navigateToRequests() {
    this.router.navigate(['requests'], {relativeTo: this.route});
  }

  navigateToSubordinatesPortal() {
    this.router.navigate(['subordinates-portal'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToReferrals() {
    this.router.navigate(['referral'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToSettings() {
    this.router.navigate(['contributor-settings'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }}); 
  }

  navigateToTransactionsHistory() {
    this.router.navigate(['transactions'], {relativeTo: this.route.parent, queryParams: {
      balance: this.contributor.account?.balance,
      contributor_id: this.contributor._id
    }});
  }



  navigateToActivities() {
    this.router.navigate(['activities'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToPersonalData() {
    this.router.navigate(['personal-data'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToPrivilege() {
    this.router.navigate(["/privilege"], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToCommissionPortal() {
    this.router.navigate(["/contributor-commission"], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  navigateToIdentity() {
    this.router.navigate(["identity"], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor._id
    }});
  }

  openDailyDeposit() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '99%';
    config.height = '25em';
    config.autoFocus = true;
    config.data = {
      contributor_id: this.contributor._id
    }
    this.dialog.open(ChangeDailyDepositComponent, config);
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/home");
  }
}
