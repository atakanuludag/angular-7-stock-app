import { Injectable } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class DashboardGetResolver implements Resolve<any> {
  constructor(private service: DashboardService) {}

  resolve(route: ActivatedRouteSnapshot) {
    
    return new Promise((resolve, reject) => {
      this.service.get().pipe().subscribe(data => {
        resolve(data);
      });
    });
    
  }
}
