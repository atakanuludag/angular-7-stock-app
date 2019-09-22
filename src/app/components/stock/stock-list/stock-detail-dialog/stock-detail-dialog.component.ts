import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StockModel } from '../../../../core/models/stock.model';

@Component({
  selector: 'app-stock-detail-dialog',
  templateUrl: './stock-detail-dialog.component.html'
})
export class StockDetailDialogComponent {
  
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StockModel,
    public dialogRef: MatDialogRef<StockDetailDialogComponent>
  ) { }

  ngOnInit() {
    console.log(this.data);
  }



}
