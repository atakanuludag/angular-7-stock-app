import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-server-error-dialog',
  templateUrl: './server-error-dialog.component.html'
})
export class ServerErrorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ServerErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

}
