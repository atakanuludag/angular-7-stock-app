import { Injectable } from '@angular/core';
import { StockService } from '../../core/services/stock.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class StockGetResolver implements Resolve<any> {
  constructor(private service: StockService) {}

  resolve(route: ActivatedRouteSnapshot) {

    const id = route.paramMap.get('id');
    return new Promise((resolve, reject) => {
      this.service.get(id).pipe().subscribe(data => {
        resolve(data);
      });
    });
    
  }
}

@Injectable()
export class StockListResolver implements Resolve<any> {
  constructor(private service: StockService) {}

  resolve(route: ActivatedRouteSnapshot){

    const pageSize = localStorage.getItem('pageSize');

    let params = {
      pageSize: pageSize ? pageSize : 30
    };

    params = Object.assign({}, params, route.queryParams);
 
    return new Promise((resolve, reject) => {
      this.service.list(params).pipe().subscribe(data => {
        console.log(data);
        resolve(data);
      });
    });
    
  }
}
