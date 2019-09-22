import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

  confirmSelection(){
    this.dialogRef.close(true);
  }

}
