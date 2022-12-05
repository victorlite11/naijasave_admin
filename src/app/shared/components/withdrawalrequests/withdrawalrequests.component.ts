import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WithdrawalRequest } from '../../interface/shared-interface';
import { AdminModel } from '../../models/admin-model/admin-model';
import { AdminService } from '../../services/admin/admin.service';
import { ContributorsService } from '../../services/contributors/contributors.service';
import { PaymentService } from '../../services/payment/payment.service';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';
 
@Component({
  selector: 'app-shared-component-withdrawalrequests',
  templateUrl: './withdrawalrequests.component.html',
  styleUrls: ['./withdrawalrequests.component.scss']
})
export class WithdrawalrequestsComponent implements OnInit {
  // db
  fetchingRequests = true;
  withdrawalRequests: WithdrawalRequest[] = []
  admin = new AdminModel()
  name = "Total Withdrawal Requests"
  title = "Withdrawal Requests"

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";


  approving = false;
  notHeadAdmin = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private adminService: AdminService,
    private contributorsService: ContributorsService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.data.subscribe(async data => {
      let admin = await this.adminService.getAdmin(data.admin_id);
      this.admin = admin;
      this.notHeadAdmin = !admin.identity?.isHeadAdmin as boolean;
      this.withdrawalService.fetchAndObserveWithdrawalRequests(data.admin_id).subscribe(requests => {
        requests.forEach(r => {
          r.date = new Date(r.date).toDateString();
        })
        this.withdrawalRequests = requests;
        this.fetchingRequests = false;
      });
    });
  }

  approve(requester_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let request = this.withdrawalRequests.filter(r => r.requester_id == requester_id)[0];

      await this.paymentService.debit({
        _id: request._id,
        amount: request.amount,
        check: true,
        date: request.date,
        from: request.requester_id,
        to: data.admin_id,
        method: 'CASH',
        statement: request.statement,
        purpose: request.purpose,
        send_sms_notification: request.send_sms_notification
      }).then( response => {
        this.approving = false;
        if (response.success) {
          this.feedback = response.message;
          this.type = "success";
          this.init();
        } else {
          this.feedback = response.message;
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })

    })
  }

  async reject(request_id: string) {
    await this.withdrawalService.removeRequest(request_id).catch(
      emessage => {
        this.feedback = emessage;
        this.type = "error";

        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      }
    );
    this.init(); // fetch the requests again
  }

  forwardToOverseer(request_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {
      let c = await this.contributorsService.getContributor(data.contributor_id);

      await this.withdrawalService.forwardWithdrawalRequestToOverseer(
        request_id,
        c.basicInformation!!.overseerId
      ).then(result => {
        this.approving = false;
        if(result.success) {
          this.feedback = result.message;
          this.type = "success";
  
          setTimeout(() => {
            this.feedback = ""
          }, 5100)
          this.init(); // fetch the requests again
        }
      });
    });
  }
  
}
