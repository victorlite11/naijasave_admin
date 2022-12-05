import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankDetails } from 'src/app/shared/models/contributor-model/contributor-model';
import { WithdrawalService } from 'src/app/shared/services/withdrawal/withdrawal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw-savings',
  templateUrl: './withdraw-savings.component.html',
  styleUrls: ['./withdraw-savings.component.scss']
})
export class WithdrawSavingsComponent implements OnInit {
  updatable = false;
  withdrawing = false;
  balance = "0";
  title = "Withdraw Savings";
  form = new FormGroup({
    withdraw: new FormControl(0, [Validators.required, Validators.min(10)]),
    accountNumber: new FormControl(''),
    accountName: new FormControl(''),
    bankName: new FormControl(''),
    purpose: new FormControl('OtherTransactions', Validators.required),
    statement: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  private contributor_id = "";
  private overseer_id = "";

  constructor(
    private withdrawalService: WithdrawalService,
    private route: ActivatedRoute
    ) {}

  
  ngOnInit(): void {
    this.updatable = true;
    this.route.queryParams.subscribe(async query => {
      this.balance = query.balance
      this.contributor_id = query.contributor_id;
      this.overseer_id = query.overseer_id;
    this.form.setValue({
      date: new Date(),
      withdraw: 100,
      name: query.name,
      purpose: "OtherTransactions",
      bankName: query.bankName,
      accountName: query.accountName,
      accountNumber: query.accountNumber,
      statement: `${query.name} Withdrawal Request`
    });
    })
  }

  close() {
    return false;
  }

  withdraw() {
    this.withdrawing = true;

    this.withdrawalService.sendWithdrawalRequest({
      statement: this.form.value.statement,
      amount: this.form.value.withdraw,
      withdrawerName: this.form.value.name,
      requester_id: this.contributor_id,
      overseer_id: this.overseer_id,
      purpose: this.form.value.purpose,
      date: this.form.value.date.toISOString(),
      bankDetails: {
        bankName: this.form.value.bankName,
        accountNumber: this.form.value.accountNumber,
        name: this.form.value.accountName
      }
    }).then(result => {
      this.withdrawing = false;
      if(result.success) {
        Swal.fire({title: "Successful", text: result.message, icon: "success", width: "70%", position: "center"});
      } else {
        Swal.fire({title: "Not Successful", text: result.message, icon: "error", width: "70%", position: "center"});
      }
      return false;
    })
  }

}
