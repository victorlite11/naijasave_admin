import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WithdrawalRequest } from 'src/app/shared/interface/shared-interface';
import { SignupRequestModel } from 'src/app/shared/models/signup-request-model/signup-request-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-requests',
  templateUrl: './signup-requests.component.html',
  styleUrls: ['./signup-requests.component.scss']
})
export class SignupRequestsComponent implements OnInit {
  // db
  fetchingRequests = true;
  signupRequests: SignupRequestModel[] = []
  name = "Total Signup Requests"
  title = "Signup Requests"
  approving = false;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signupService: SignupService,
    private adminService: AdminService,
    private contributorsService: ContributorsService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.route.data.subscribe(async data => {
      await this.signupService.fetchSignupRequests().then(requests => {
        requests.forEach(r => {
          r.regDate = new Date(r.regDate).toDateString();
        })
        this.signupRequests = requests;
        this.fetchingRequests = false;
      });
    });
  }

  approve(request_id: string) {
    this.approving = true;
    this.route.data.subscribe(async data => {

      await this.contributorsService.createNewContributor(request_id).then( response => {
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
    this.route.data.subscribe(async data => {
      await this.signupService.removeSignupRequest(data.admin_id, request_id).then(
        r => {
          if(!r.success) {
            this.feedback = r.message;
            this.type = "error";
      
            setTimeout(() => {
              this.feedback = ""
            }, 5100)
          }
        }
      );
      this.init(); // fetch the requests again
    })
  }

  editSignupRequest(request_id: string)   {
    this.router.navigate(['signuprequests-edit'], {relativeTo: this.route.parent, queryParams: {
      request_id: request_id
    }});
  }
}
