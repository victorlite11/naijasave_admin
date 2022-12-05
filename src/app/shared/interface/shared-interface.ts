import { BankDetails, BasicContributorDto } from "../models/contributor-model/contributor-model";

export class IAuthCredential {
    login?: string;
    password?: string;
    auth_token?: string;
    remember?: "true" | "false"
}

export class IAuthResult {
    authenticated: boolean = false;
    authToken?: string;
    for?: string;
    reason?: string;
}

export class ContributorsCountResponse {
    supers: number = 0;
    subs: number = 0;
    investors: number = 0;
    contributors: number = 0;
    total: number = 0;
}

export class NavItem {
    name: string = "";
    icon: string = "";
    display: boolean = true;
    badge : {
        display: boolean,
        content: string | number
      } = {display : false, content : 0};
    navData: NavData = new NavData({destination : "", queryParams : {}})
    constructor(
        op: {
            name: string,
            icon: string,
            display: boolean,
            badge?: {
                display: boolean,
                content: string | number
              },
            navData: NavData
        }
    ) {
        this.name = op.name;
        this.icon = op.icon;
        this.display = op.display;
        if(op.badge) {
           this.badge = op.badge || new NavData({destination : "", queryParams : {}}); 
        }
        this.navData = op.navData;
    }
    
}

export class NavData {
    destination: string = "";
    queryParams: {} = {}
    constructor(
        op: {        
            destination: string,
            queryParams: {}
        }
    ) {
        this.destination = op.destination;
        this.queryParams = op.queryParams;
    }
}

export class DepositRequest {
    _id?: string;
    statement: string = "";
    amount: number = 0;
    date: string = "";
    purpose: "DailySavings" = "DailySavings";
    depositorName: string = "";
    requester_id: string = "";
    overseer_id: string = "";
    send_sms_notification?: boolean = false;
}

export class WithdrawalRequest {
    _id?: string;
    statement: string = "";
    amount: number = 0;
    date: string = "";
    purpose: "DailySavings" = "DailySavings";
    withdrawerName: string = "";
    bankDetails: BankDetails = new BankDetails();
    overseer_id: string = ""
    requester_id: string = "";
    send_sms_notification?: boolean = false;
}

export class SubordinatesRequest {
    contributor_id?: string = ""; // used to fetch those under the entity
    count?: boolean = false;
    assignable?: boolean = false; // assignable and intended_new_overseer_id goes together
    intended_new_overseer_id?: string = "" // used to determine the assignable subordinates to return
    subordinate_id?: string = "";
    identity?: "investors" | "contributors" | "sub-contributors" | "super-contributors" = "contributors";
}

export class ContributorsFetchRequest extends SubordinatesRequest {
    status?: 'active' | 'inactive';
    overseer_id?: string;
}

export class RequestsCountResponse {
    signups: number = 0;
    deposits: number = 0;
    withdrawals: number = 0;
    total: number = 0;
}


export class SMSProforma {
    _id?: string;
    for: "account-change" | "daily-savings" | "debits" | "credits" | "signups" | "deposit-requests" | "withdrawal-requests" = "account-change"
    message: string = ""; // $name, $amount, $balance, $statement, $account-type
}

export class AnnouncementsCountResponse {
    total: number = 0;
}

export class AnnouncementModel {
    _id?: string;
    title: string = "";
    body: string = "";
    date?: string = "";
    auther?: string = "";
    category: Category = new Category()
}

export class Category {
    general?: boolean = true;
    admins?: boolean = false;
    investors?: boolean = false;
    contributors?: boolean = false;
    subContributors?: boolean = false;
    superContributors?: boolean = false;
}

export class BasicContributorModel {
    _id?: string;
    name: string = "";
    phoneNumber: string = "";
    imageUrl?: string = "";
    status?: "active" | "inactive" | "" = "inactive";
}

export class BasicContributorOverseerModel extends BasicContributorModel {
    username?: string;
    identity?: "admin" | "contributor";
}

export class BasicTransactionModel {
    statement: string = "";
    amount: number = 0;
    _id: string = "";
    date: string = ""
}

export class DetailedPaymentDataModel {
    purpose: string = "";
    statement: string = "";
    date: string = "";
    time: string = "";
    amount: number = 0;
    payer: string = ""; // name (account type)
    receiver: string = ""; // name (account type)
    payerPhoneNumber: string = "";
    receiverPhoneNumber: string = "";
}

export interface Destination {
    destination : "conversation" | "profile" | "interaccount" | "subordinate";
}

export class SearchSelection {
    contributorId : string = "";
    phoneNumber : string = "";
    name: string = "";
}

export class OperationFeedback {
    success: boolean = false;
    message: string = "Not Successful";
    data?: string;
}

export class ReferralData {
    balance: number = 0;
    code: string = "";
    referred: BasicContributorDto[] = []
}

