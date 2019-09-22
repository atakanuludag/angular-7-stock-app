import { Injectable } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BrandGetResolver implements Resolve<any> {
  constructor(private service: BrandService) {}

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
export class BrandListResolver implements Resolve<any> {
  constructor(private service: BrandService) {}

  resolve(){
    return new Promise((resolve, reject) => {
      this.service.list().pipe().subscribe(data => {
        resolve(data);
      });
    });
    
  }
}
