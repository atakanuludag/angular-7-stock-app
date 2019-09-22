import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../../../core/services/brand.service';
import { StockModel } from '../../../core/models/stock.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar, MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { ConfirmDialogComponent } from '../../../core/layout/confirm-dialog/confirm-dialog.component';
import { StockDetailDialogComponent } from './stock-detail-dialog/stock-detail-dialog.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  search: string = "";
  pageSize: number = 30;
  totalPages: number = 10;
  pageIndex: number = 0;
  sType: string = "stockCode";
  pagination: object = {};
  dataSource = new MatTableDataSource<StockModel>();
  componentSubscription: any;

  displayedColumns: string[] = ['stockCode', 'quantity', 'purchasePrice', 'salePrice', 'shelfCode', 'compatibleModels', 'description', 'operations'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: BrandService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.search = route.snapshot.queryParams.s ? route.snapshot.queryParams.s : "";
    this.sType = route.snapshot.queryParams.sType ? route.snapshot.queryParams.sType : "stockCode";
    this.pageIndex = route.snapshot.queryParams.page ? (parseInt(route.snapshot.queryParams.page) - 1) : 0; //pageIndex

    if (localStorage.getItem('pageSize')) {
      this.pageSize = parseInt(localStorage.getItem('pageSize'));
    }

    this.componentSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) this.ngOnInit();
    });

  }

  ngOnInit() {
    const resolveData = this.route.snapshot.data.stock;
    this.totalPages = resolveData.totalPages + 1;
    this.dataSource.data = resolveData.results;
  }

  ngOnDestroy() {
    if (this.componentSubscription) this.componentSubscription.unsubscribe();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = null;
    this.dataSource.paginator = null;
  }

  sorting(event: any) {

    if (event.direction) {
      this.router.navigate(['/stock'], {
        queryParams: {
          order: event.active,
          orderBy: event.direction,
          s: this.search,
          sType: this.sType
        }
      });
    } else {
      this.router.navigate(['/stock'], {
        queryParams: {
          s: this.search,
          sType: this.sType
        }
      });
    }


    console.log("event", event);
  }
  pageChanged(event: any) {

    this.router.navigate(['/stock'], {
      queryParams: {
        pageSize: event.pageSize,
        page: event.pageIndex + 1
      }
    });

    localStorage.setItem('pageSize', event.pageSize);

    console.log("event", event);
  }


  getInfo(collection: StockModel) {
    this.dialog.open(StockDetailDialogComponent, {
      //height: '400px',
      width: '600px',
      data: collection
    });
  }

  newItem() {
    this.router.navigate([`/stock/new`]);
  }

  edit(id: number) {
    this.router.navigate([`/stock/edit/${id}`]);
  }

  delete(id: number, index: number) {

    let dialog = this.dialog.open(ConfirmDialogComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.service.delete(id).pipe().subscribe(data => {
            this.snackBar.open('Kayıt silindi.', '', { duration: 500 });
            console.log(data);
            this.dataSource.data.splice(index, 1);
            this.dataSource = new MatTableDataSource<StockModel>(this.dataSource.data);
          });
        }
      });
  }

  searchFilter() {
    this.router.navigate(['/stock'], { queryParams: { s: this.search, sType: this.sType } });
  }
}
