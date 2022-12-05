import { ActionModel } from "../contributor-model/contributor-model";

export class CompanyModel {
    _id?: string;
    basicInformation?: CompanyBasicInformationModel = new CompanyBasicInformationModel();
    credentials?: CompanyCredentialsModel = new CompanyCredentialsModel();
    account?: CompanyAccountModel = new CompanyAccountModel();
    activities?: CompanyActivitiesModel = new CompanyActivitiesModel();
    referral?: CompanyReferralModel = new CompanyReferralModel();
    settings?: CompanySettingsModel = new CompanySettingsModel();
}

export class CompanyBasicInformationModel {
    name: string = "";
    dateCreated?: string = "";
}

export class CompanyCredentialsModel {
    password: string = "6sy7ay7sdy7a";
}

export class CompanyAccountModel {
    tradingBalance: number = 0;
    availableTradingBalance: number = 0;
    commission : CommissionAccount = new CommissionAccount();
}

export class CommissionAccount {
    balance : number = 0
}

export class CompanyActivitiesModel {
    actions: Array<ActionModel> = [];
}

export class CompanyReferralModel {
    amountPaidOut: number = 0;
    totalReferrals: number = 0;
    minimumWithdrawable: number = 0;
    earningPerReferral: number = 0;
}

export class CompanySettingsModel {
    inactiveTolerance: string = "10";
    depositChangeAbleDays: DepositChangableDays = new DepositChangableDays()
    contributorAccountMaturityCriteria: ContriutorAccountCriteria = new ContriutorAccountCriteria();
    depositRequestsSMSNotification?: boolean = false;
    withdrawalRequestsSMSNotification?: boolean = false;
    signupRequestsApprovalSMSNotification?: boolean = false;
}

class DepositChangableDays {
    from: string = "";
    to: string = "";
}

class ContriutorAccountCriteria {
    days: string = "";
    amount?: {
      use: boolean;
      amount: string;
    } = {use: false, amount: ""}
  }
