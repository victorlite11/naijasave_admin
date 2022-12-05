export class PaymentModel {
    _id?: string;
    amount: number = 0;
    from: string = "";
    to: string = "";
    statement?: string;
    date?: string;
    method: "ONLINE" | "CASH" = "CASH";
    check?: boolean;
    purpose: "DailySavings" | "OtherTransactions" = "OtherTransactions";
    send_sms_notification?: boolean = false;
}

export class AccountSummary {
    admins : {
        total: number;
        headAdmin: number;
        superAdmin: number;
        subAdmin: number;
    } = {total : 0, headAdmin : 0, superAdmin: 0, subAdmin: 0}
    contributors : {
        total: number;
        contributors: number;
        investors: number;
        superContributors: number;
        subContributors: number;
    } = {total: 0, contributors: 0, investors: 0, superContributors: 0, subContributors: 0}
    commissions : {
        company : number;
        superContributors : number;
        subContributors : number;
    } = {company : 0, superContributors : 0, subContributors: 0}
}

export class OverseerCommissionSummary {
    overseer_id: string = "";
    balance: number = 0;
    name: string = ""
}

 