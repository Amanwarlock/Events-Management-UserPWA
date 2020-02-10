import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-confirm-pwd-dialog',
  templateUrl: './confirm-pwd-dialog.component.html',
  styleUrls: ['./confirm-pwd-dialog.component.scss']
})
export class ConfirmPwdDialogComponent implements OnInit {

  hide:boolean = true;

  password = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ConfirmPwdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    OnCancel(): void {
      this.dialogRef.close(false);
    }
    ngOnInit() {
    }
  
    OnVerify(){
      let result = {
        user: this.data,
        password: this.password.value
      }
      this.dialogRef.close(result);
    }
}
