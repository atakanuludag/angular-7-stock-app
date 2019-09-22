import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app.config';
//import { BrandModel } from '../models/brand.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private mainApiUrl:string = 'report';

  constructor(private http: HttpClient) {}


  get(): Observable<any> {
    return this.http.get<any>(`${Config.serviceUrl}/${this.mainApiUrl}`)
    .pipe(map((res: any) => 
      {
          return res;
      }
    ));
  }



}
