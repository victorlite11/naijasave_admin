import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DefaultComponent } from './default.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import  { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatChipsModule } from "@angular/material/chips";
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from "@angular/material/radio";

import { environment } from "../../../environments/environment.prod";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddcontributorComponent } from 'src/app/modules/default/components/addcontributor/addcontributor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { ContributorComponent } from './components/contributor/contributor.component';
import { DepositorsComponent } from './components/subordinates/depositors.component';
import { HomeComponent } from './components/home/home.component';
import { InteraccountComponent } from './components/interaccount/interaccount.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { PriviledgeComponent } from './components/priviledge/priviledge.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubordinateComponent } from './components/subordinate/subordinate.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { WithdrawSavingsComponent } from './components/withdraw-savings/withdraw-savings.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SubordinatesPortalComponent } from './components/subordinates-portal/subordinates-portal.component';
import { SearchPortalComponent } from './components/search-portal/search-portal.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { IdentityComponent } from './components/identity/identity.component';
import { AddSubordinatesPortalComponent } from './components/add-subordinates-portal/add-subordinates-portal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyComponent } from './components/company/company.component';
import { AdminsPortalComponent } from './components/admins-portal/admins-portal.component';
import { ContributorsPortalComponent } from './components/contributors-portal/contributors-portal.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { SubordinatesSearchPortalComponent } from './components/subordinates-search-portal/subordinates-search-portal.component';
import { AdminIdentityComponent } from './components/admin-identity/admin-identity.component';
import { AdminPrivilegeComponent } from './components/admin-privilege/admin-privilege.component';
import { AdminInteraccountComponent } from './components/admin-interaccount/admin-interaccount.component';
import { SignupRequestsComponent } from './components/signup-requests/signup-requests.component';
import { SignupRequestsEditComponent } from './components/signup-requests-edit/signup-requests-edit.component';
import { AdminTransactionHistoryComponent } from './components/admin-transaction-history/admin-transaction-history.component';
import { CreateAnnouncementComponent } from './components/create-announcement/create-announcement.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllActivitiesLogComponent } from './components/all-activities-log/all-activities-log.component';
import { AdminPersonalDataComponent } from './components/admin-personal-data/admin-personal-data.component';
import { ChangeContributorOverseerComponent } from './components/change-contributor-overseer/change-contributor-overseer.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ChatsPortalComponent } from './components/chats-portal/chats-portal.component';
import { SmsPortalComponent } from './components/sms-portal/sms-portal.component';
import { CreateSmsProformaComponent } from './components/create-sms-proforma/create-sms-proforma.component';
import { SendSmsComponent } from './components/send-sms/send-sms.component';
import { CheckPasswordComponent } from './components/check-password/check-password.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { CommissionComponent } from './components/commission/commission.component';
import { CompanyCommissionComponent } from './components/company-commission/company-commission.component';
import { AdminCommissionComponent } from './components/admin-commission/admin-commission.component';
import { UpdateTradingBalanceComponent } from './components/update-trading-balance/update-trading-balance.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { OnlinePaymentAccountComponent } from './components/online-payment-account/online-payment-account.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DepositorsComponent,
    ContributorComponent,
    TermsandconditionsComponent,
    PriviledgeComponent,
    AddcontributorComponent,
    SettingsComponent,
    AnnouncementComponent,
    HomeComponent,
    PersonalDataComponent,
    InteraccountComponent,
    SubordinateComponent,
    ReferralsComponent,
    PersonalDataComponent,
    TermsandconditionsComponent,
    AddcontributorComponent,
    WithdrawSavingsComponent,
    RequestsComponent,
    SubordinatesPortalComponent,
    CreateAnnouncementComponent,
    SearchPortalComponent,
    TransactionHistoryComponent,
    ActivitiesComponent,
    IdentityComponent,
    AddSubordinatesPortalComponent,
    DashboardComponent,
    CompanyComponent,
    AdminsPortalComponent,
    ContributorsPortalComponent,
    AdminComponent,
    NewAdminComponent,
    ContributorsComponent,
    SubordinatesSearchPortalComponent,
    AdminIdentityComponent,
    AdminPrivilegeComponent,
    AdminInteraccountComponent,
    SignupRequestsComponent,
    SignupRequestsEditComponent,
    AdminTransactionHistoryComponent,
    AllActivitiesLogComponent,
    AdminPersonalDataComponent,
    ChangeContributorOverseerComponent,
    ChatsComponent,
    ChatsPortalComponent,
    SmsPortalComponent,
    CreateSmsProformaComponent,
    SendSmsComponent,
    CheckPasswordComponent,
    AdminSettingsComponent,
    CommissionComponent,
    CompanyCommissionComponent,
    AdminCommissionComponent,
    UpdateTradingBalanceComponent,
    AccountSummaryComponent,
    OnlinePaymentAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatRadioModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    MatChipsModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ]
})
export class DefaultModule { }
