import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand.service';
import { BrandModel } from '../../../core/models/brand.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../core/layout/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  collection: BrandModel[];

  dataSource = new MatTableDataSource<BrandModel>();

  displayedColumns: string[] = ['name', 'description', 'operations'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: BrandService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.data = this.route.snapshot.data.brand;
  }

  newItem(){
    this.router.navigate([`/brand/new`]);
  }

  edit(id:number){
    this.router.navigate([`/brand/edit/${id}`]);
  }

  delete(id:number, index:number){
    
    let dialog = this.dialog.open(ConfirmDialogComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.service.delete(id).pipe().subscribe(data => {
            this.snackBar.open('Kayıt silindi.', '', {duration: 500});
            console.log(data);
            this.dataSource.data.splice(index, 1);
            this.dataSource = new MatTableDataSource<BrandModel>(this.dataSource.data);
          });
        }
      });
  }
}
