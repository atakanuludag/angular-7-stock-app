import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app.config';
import { BrandModel } from '../models/brand.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private mainApiUrl:string = 'brand';

  constructor(private http: HttpClient) {}

  list(): Observable<BrandModel[]> {
    return this.http.get<BrandModel>(`${Config.serviceUrl}/${this.mainApiUrl}`)
    .pipe(map((res: any[]) => 
      {
        return res.map(item => {
          return new BrandModel(
              item._id,
              item.name,
              item.description,
              item.createdDate,
              item.updatedDate
          );
        });
      }
    ));
  }


  get(id: string): Observable<BrandModel> {
    return this.http.get<BrandModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${id}`)
    .pipe(map((res: any) => 
      {
        return new BrandModel(
          res._id,
          res.name,
          res.description,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }


  create(data: BrandModel): Observable<BrandModel> {
    return this.http.post<BrandModel>(`${Config.serviceUrl}/${this.mainApiUrl}`, data)
    .pipe(map((res: any) => 
      {
        return new BrandModel(
          res._id,
          res.name,
          res.description,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }

  update(data: BrandModel): Observable<BrandModel> {
    return this.http.patch<BrandModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${data.id}`, data)
    .pipe(map((res: any) => 
      {
        return new BrandModel(
          res._id,
          res.name,
          res.description,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }

  delete(id: number): Observable<BrandModel> {
    return this.http.delete<BrandModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${id}`)
    .pipe(map((res: any) => 
      {
        return new BrandModel(
          res._id,
          res.name,
          res.description,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }


}
