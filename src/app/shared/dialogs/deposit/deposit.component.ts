import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepositService } from '../../services/deposit/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  updatable = false;
  data: {
    contributor_id: string,
    dailySavings: string,
    overseer_id: string,
    name: string
  };
  form = new FormGroup({
    deposit: new FormControl(0, [Validators.required, Validators.min(10)]),
    name: new FormControl("", Validators.required),
    statement: new FormControl("", Validators.required),
    purpose: new FormControl("DailySavings", Validators.required),
    transactionDate: new FormControl("", Validators.required)
  });
  depositing = false;
  constructor(
    public dialogRef: MatDialogRef<DepositComponent>,
    private depositService: DepositService,
    @Inject(MAT_DIALOG_DATA) data: any
    ) { 
      this.data = data;
    }

  ngOnInit(): void {
    this.updatable = true;

    this.form.setValue({
      deposit: Number(this.data.dailySavings),
      name: this.data.name,
      purpose: "DailySavings",
      transactionDate: new Date(),
      statement: `${this.data.name} Daily Deposit`
    });
    
  }

  cancel() {
    this.dialogRef.close();
    return false;
  }

  deposit() {
    this.depositing = true;
    this.depositService.sendDepositRequest({
      statement: this.form.value.statement,
      amount: this.form.value.deposit,
      depositorName: this.form.value.name,
      purpose:this.form.value.purpose,
      requester_id: this.data.contributor_id,
      overseer_id: this.data.overseer_id,
      date: this.form.value.transactionDate.toISOString()
    }).then(response => {
      this.depositing = false;
      this.dialogRef.close(response);
      return false;
    })
  }

}
