import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './modules/access/access.component';
import { SigninComponent } from './modules/access/components/signin/signin.component';
import { AddcontributorComponent } from './modules/default/components/addcontributor/addcontributor.component';
import { AnnouncementComponent } from './modules/default/components/announcement/announcement.component';
import { ContributorComponent } from './modules/default/components/contributor/contributor.component';
import { DepositorsComponent } from './modules/default/components/subordinates/depositors.component';
import { HomeComponent } from './modules/default/components/home/home.component';
import { InteraccountComponent } from './modules/default/components/interaccount/interaccount.component';
import { PersonalDataComponent } from './modules/default/components/personal-data/personal-data.component';
import { PriviledgeComponent } from './modules/default/components/priviledge/priviledge.component';
import { ReferralsComponent } from './modules/default/components/referrals/referrals.component';
import { SubordinateComponent } from './modules/default/components/subordinate/subordinate.component';
import { TermsandconditionsComponent } from './modules/default/components/termsandconditions/termsandconditions.component';
import { DefaultComponent } from './modules/default/default.component';

import { DepositrequestsComponent } from './shared/components/depositrequests/depositrequests.component';
import { WithdrawalrequestsComponent } from './shared/components/withdrawalrequests/withdrawalrequests.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in/logged-in.guard';
import { WithdrawSavingsComponent } from './modules/default/components/withdraw-savings/withdraw-savings.component';
import { RequestsComponent } from './modules/default/components/requests/requests.component';
import { SubordinatesPortalComponent } from './modules/default/components/subordinates-portal/subordinates-portal.component';
import { SearchPortalComponent } from './modules/default/components/search-portal/search-portal.component';
import { TransactionHistoryComponent } from './modules/default/components/transaction-history/transaction-history.component';
import { ActivitiesComponent } from './modules/default/components/activities/activities.component';
import { IdentityComponent } from './modules/default/components/identity/identity.component';
import { AddSubordinatesPortalComponent } from './modules/default/components/add-subordinates-portal/add-subordinates-portal.component';
import { DashboardComponent } from './modules/default/components/dashboard/dashboard.component';
import { CompanyComponent } from './modules/default/components/company/company.component';
import { AdminsPortalComponent } from './modules/default/components/admins-portal/admins-portal.component';
import { NewAdminComponent } from './modules/default/components/new-admin/new-admin.component';
import { ContributorsPortalComponent } from './modules/default/components/contributors-portal/contributors-portal.component';
import { ContributorsComponent } from './modules/default/components/contributors/contributors.component';
import { SubordinatesSearchPortalComponent } from './modules/default/components/subordinates-search-portal/subordinates-search-portal.component';
import { AdminIdentityComponent } from './modules/default/components/admin-identity/admin-identity.component';
import { AdminPrivilegeComponent } from './modules/default/components/admin-privilege/admin-privilege.component';
import { AdminInteraccountComponent } from './modules/default/components/admin-interaccount/admin-interaccount.component';
import { SignupRequestsComponent } from './modules/default/components/signup-requests/signup-requests.component';
import { SignupRequestsEditComponent } from './modules/default/components/signup-requests-edit/signup-requests-edit.component';
import { AdminTransactionHistoryComponent } from './modules/default/components/admin-transaction-history/admin-transaction-history.component';
import { CreateAnnouncementComponent } from './modules/default/components/create-announcement/create-announcement.component';
import { AdminPersonalDataComponent } from './modules/default/components/admin-personal-data/admin-personal-data.component';
import { AdminComponent } from './modules/default/components/admin/admin.component';
import { IsHeadAdminGuard } from './shared/guards/is-head-admin/is-head-admin.guard';
import { ChangeContributorOverseerComponent } from './modules/default/components/change-contributor-overseer/change-contributor-overseer.component';
import { SettingsComponent } from './modules/default/components/settings/settings.component';
import { ChatsPortalComponent } from './modules/default/components/chats-portal/chats-portal.component';
import { ChatsComponent } from './modules/default/components/chats/chats.component';
import { SmsPortalComponent } from './modules/default/components/sms-portal/sms-portal.component';
import { CreateSmsProformaComponent } from './modules/default/components/create-sms-proforma/create-sms-proforma.component';
import { SendSmsComponent } from './modules/default/components/send-sms/send-sms.component';
import { CheckPasswordComponent } from './modules/default/components/check-password/check-password.component';
import { AdminSettingsComponent } from './modules/default/components/admin-settings/admin-settings.component';
import { CommissionComponent } from './modules/default/components/commission/commission.component';
import { CompanyCommissionComponent } from './modules/default/components/company-commission/company-commission.component';
import { AdminCommissionComponent } from './modules/default/components/admin-commission/admin-commission.component';
import { TradingBalanceComponent } from './shared/dialogs/trading-balance/trading-balance.component';
import { UpdateTradingBalanceComponent } from './modules/default/components/update-trading-balance/update-trading-balance.component';
import { AccountSummaryComponent } from './modules/default/components/account-summary/account-summary.component';
import { ComingSoonComponent } from './shared/components/coming-soon/coming-soon.component';
import { OnlinePaymentAccountComponent } from './modules/default/components/online-payment-account/online-payment-account.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-settings', 
        component: AdminSettingsComponent,
        canActivate: [IsHeadAdminGuard, AuthGuard]
      },
      {
        path: 'announcements', 
        component: AnnouncementComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-announcement', 
        component: CreateAnnouncementComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'interaccount', 
        component: InteraccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-interaccount', 
        component: AdminInteraccountComponent,
        canActivate: [AuthGuard, IsHeadAdminGuard]
      },
      {
        path: 'online-payment', 
        component: OnlinePaymentAccountComponent,
        canActivate: [AuthGuard, IsHeadAdminGuard]
      },
      {
        path: 'subordinates', 
        component: DepositorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contributors',
        component: ContributorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contributor-commission',
        component: CommissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'company-commission',
        component: CompanyCommissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-commission',
        component: AdminCommissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contributor',
        component: ContributorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chats-portal',
        component: ChatsPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sms-portal',
        component: SmsPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'send-sms',
        component: SendSmsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'coming-soon', 
        component: ComingSoonComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'check-password',
        component: CheckPasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sms-proforma',
        component: CreateSmsProformaComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contributor-settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'depositrequests', 
        component: DepositrequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'signuprequests', 
        component: SignupRequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'signuprequests-edit', 
        component: SignupRequestsEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'withdrawalrequests', 
        component: WithdrawalrequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'privilege', 
        component: PriviledgeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'new-contributor', 
        component: AddcontributorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'referral', 
        component: ReferralsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinate', 
        component: SubordinateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'withdraw-savings', 
        component: WithdrawSavingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'personal-data', 
        component: PersonalDataComponent,
        canActivate: [AuthGuard]
      },
      {
      path: 'admin-personal-data', 
      component: AdminPersonalDataComponent,
      canActivate: [AuthGuard]
      },
      {
        path: 'requests', 
        component: RequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinates-portal', 
        component: SubordinatesPortalComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'search-portal', 
        component: SearchPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subordinates-search-portal', 
        component: SubordinatesSearchPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'transactions', 
        component: TransactionHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'all-transactions', 
        component: AdminTransactionHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'company-profile', 
        component: CompanyComponent,
        canActivate: [IsHeadAdminGuard, AuthGuard]
      },
      {
        path: 'admin-privilege', 
        component: AdminPrivilegeComponent,
        canActivate: [AuthGuard, IsHeadAdminGuard]
      },
      {
        path: 'admin-identity', 
        component: AdminIdentityComponent,
        canActivate: [AuthGuard, IsHeadAdminGuard]
      },
      {
        path: 'new-admin', 
        component: NewAdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contributors-portal', 
        component: ContributorsPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admins', 
        component: AdminsPortalComponent,
        canActivate: [AuthGuard, IsHeadAdminGuard]
      },
      {
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'change-contributor-overseer', 
        component: ChangeContributorOverseerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update-trading-balance', 
        component: UpdateTradingBalanceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'acccount-summary', 
        component: AccountSummaryComponent,
        canActivate: [AuthGuard]
      },      
      {
        path: 'company-commission', 
        component: CompanyCommissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'credit-debit-admin', 
        component: TradingBalanceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'activities', 
        component: ActivitiesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'assign-subordinates', 
        component: AddSubordinatesPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'identity', 
        component: IdentityComponent,
        canActivate: [AuthGuard]
      },
      {path: 'termsandconditions', component: TermsandconditionsComponent}
    ]
  },
  {
    path: 'access',
    component: AccessComponent,
    children: [
      {
        path: '', 
        component: SigninComponent,
        canActivate: [LoggedInGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
