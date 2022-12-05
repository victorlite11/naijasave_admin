import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementsCountResponse, BasicTransactionModel, Category, ContributorsCountResponse, NavItem, RequestsCountResponse } from 'src/app/shared/interface/shared-interface';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { ChatModel, IChatsPayload, ConcernedChatsResponse } from 'src/app/shared/models/chats/chats-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { AnnouncementsService } from 'src/app/shared/services/announcements/announcements.service';
import { ChatsService } from 'src/app/shared/services/chats/chats.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { RequestsService } from 'src/app/shared/services/requests/requests.service';

import "bootstrap";
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransactionSlipComponent } from 'src/app/shared/dialogs/transaction-slip/transaction-slip.component';
import { ExtendedNavItems } from 'src/app/shared/components/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  admin = new AdminModel()
  contributorsCount = new ContributorsCountResponse();
  concernedChats = new ConcernedChatsResponse();
  requestsCount = new RequestsCountResponse();
  announcementsCount = new AnnouncementsCountResponse();

  transactionsHistory: BasicTransactionModel[] = [];
  
  accountType = "";

  fetchingAdminData = true;

  mainNavItems : NavItem[] = [];
  extendedNavItems : ExtendedNavItems = {
    display : true,
    navItems : []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private contributorsService: ContributorsService,
    private requestsService: RequestsService,
    public dialog: MatDialog,
    private transactionsService: TransactionsService,
    @Inject('AUTH_KEY_PROPERTY_NAME') private authKeyName: string,
    private chatsService: ChatsService,
    private announcementService: AnnouncementsService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.fetchingAdminData = true;
    this.route.data.subscribe(
      async data => {
        this.admin = await this.adminService.getAdmin(data.admin_id);
        sessionStorage.setItem('admin_id', this.admin._id as string); 
        
        this.fetchingAdminData = false;
        // define accountType
        this.defineAccountType();

        this.contributorsCount = await this.contributorsService.countContributors();
        this.requestsCount = await this.requestsService.countRequests();
        this.announcementsCount = await this.announcementService.countAnnouncements({general : true});
        this.concernedChats = await this.chatsService.retrieveConcernedChats("admin", data.admin_id);

        // main nav items
        this.mainNavItems = [
          // Contributors
          new NavItem({name: "Contributors", icon: "users", display: true, badge: {
            display: true,
            content: this.contributorsCount.total
          }, navData: {
            destination: "contributors-portal", 
            queryParams : {}
          }}),

          // Contributors Interaccount
          new NavItem({name: "CInter", icon: "money-bill", display: true, navData: {
            destination: "interaccount", 
            queryParams : {}
          }}),

          // All Transactions
          new NavItem({name: "Transactions", icon: "external-link", display: true, navData: {
            destination: "all-transactions", 
            queryParams : {}
          }}),
        ]

        // extended nav items
        this.extendedNavItems = {display: true, navItems: [
          // Company
          new NavItem({name: "Company", icon: "sitemap", display: this.admin!!.identity!!.isHeadAdmin as boolean,
            navData: {
            destination: "company-profile", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Company
          new NavItem({name: "OnlinePays", icon: "money-bill", display: this.admin!!.identity!!.isHeadAdmin as boolean,
            navData: {
            destination: "online-payment", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Admins portal
          new NavItem({name: "Admins", icon: "users", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "admins", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Admins Interaccount
          new NavItem({name: "AInter", icon: "money-bill", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "admin-interaccount", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Airtime topup
          new NavItem({name: "Airtime", icon: "mobile", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Airtime Topup'
            }
          }}), 

          // Bills Payment
          new NavItem({name: "Bills", icon: "wallet", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Bills Payment'
            }
          }}), 

          // Earn Money
          new NavItem({name: "Earn", icon: "money-bill", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Earn'
            }
          }}), 

          // Gaming
          new NavItem({name: "Gaming", icon: "dollar", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Gaming'
            }
          }}), 

          // Travels
          new NavItem({name: "Travels", icon: "globe", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Travel and Leisure'
            }
          }}), 

          // Identity
          new NavItem({name: "Identity", icon: "user", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "admin-identity", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Privilege
          new NavItem({name: "Privilege", icon: "briefcase", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "admin-privilege", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Requests
          new NavItem({name: "Requests", icon: "ticket", display: true, navData: {
            destination: "requests", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }, badge : {
            display: true,
            content: this.requestsCount.total
          }}), 
        
          // Chats Portal
          new NavItem({name: "Conversations", icon: "comments", display: true, navData: {
            destination: "chats-portal", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }, badge: {
            display: true,
            content: this.concernedChats.totalUnreadMessages
          }}), 

          // Check Password
          new NavItem({name: "Passwords", icon: "key", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "check-password", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Personal Data
          new NavItem({name: "Profile", icon: "user", display: true, navData: {
            destination: "admin-personal-data", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // SMS
          new NavItem({name: "SMS", icon: "comment", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "sms-portal", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

          // Naijasave Near me
          new NavItem({name: "NearMe", icon: "map-marker", display: true, navData: {
            destination: "coming-soon", 
            queryParams : {
              title: 'Naijasave Near Me'
            }
          }}), 

          // Settings
          new NavItem({name: "Settings", icon: "cog", display: this.admin!!.identity!!.isHeadAdmin as boolean, navData: {
            destination: "admin-settings", 
            queryParams : {
              username: this.admin.credentials?.username as string
            }
          }}), 

        ]}

        this.fetchingAdminData = false;

        // history
        await this.fetchTransactions();

      }
    )
  }

  async fetchTransactions() {
    let result: BasicTransactionModel[] = [];

    await this.transactionsService.fetchAllHistory().then(trxs => {
      trxs.forEach(h => {
        h.date = new Date(h.date).toDateString();
        result.push(h);
      });

      this.transactionsHistory = result.reverse().slice(0, 10);
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

  navigateToAnnouncements() {
    this.router.navigate(['announcements'], {relativeTo: this.route});
  }

  navigateToAllTransactions() {
    this.router.navigate(['all-transactions'], {relativeTo: this.route});
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/access");
  }

}
