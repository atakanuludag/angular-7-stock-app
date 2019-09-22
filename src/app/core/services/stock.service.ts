import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app.config';
import { StockModel } from '../models/stock.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private mainApiUrl:string = 'stock';

  constructor(private http: HttpClient) {}


  


  list(params:any): Observable<any> {
    return this.http.get<StockModel>(`${Config.serviceUrl}/${this.mainApiUrl}`, {
      params: params
    })
    .pipe(map((res: any) => 
      {
        return {
          currentPage: res.currentPage,
          currentPageSize: res.currentPageSize,
          pageSize: res.pageSize,
          totalPages: res.totalPages,
          totalResults: res.totalResults,
          results: res.results.map(item => {


            let purchasePrice = 0, salePrice = 0;
            if(!isNaN(item.purchasePrice) && item.purchasePrice) {
              purchasePrice = item.purchasePrice;
            }
            if(!isNaN(item.salePrice) && item.salePrice) {
              salePrice = item.salePrice;
            }
           
            
            return new StockModel(
              item._id,
              item.stockCode,
              item.quantity,
              item.description,
              item.brand ? item.brand : {},
              purchasePrice,
              salePrice,
              item.shelfCode,
              item.compatibleModels,
              item.createdDate,
              item.updatedDate
            );
          })
        };
      }
    ));
  }


  get(id: string): Observable<StockModel> {
    return this.http.get<StockModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${id}`)
    .pipe(map((res: any) => 
      {
        return new StockModel(
          res._id,
          res.stockCode,
          res.quantity,
          res.description,
          res.brand ? res.brand._id : {},
          res.purchasePrice,
          res.salePrice,
          res.shelfCode,
          res.compatibleModels,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }


  create(data: StockModel): Observable<StockModel> {
    return this.http.post<StockModel>(`${Config.serviceUrl}/${this.mainApiUrl}`, data)
    .pipe(map((res: any) => 
      {
        return new StockModel(
          res._id,
          res.stockCode,
          res.quantity,
          res.description,
          res.brand,
          res.purchasePrice,
          res.salePrice,
          res.shelfCode,
          res.compatibleModels,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }

  update(data: StockModel): Observable<StockModel> {
    return this.http.patch<StockModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${data.id}`, data)
    .pipe(map((res: any) => 
      {
        return new StockModel(
          res._id,
          res.stockCode,
          res.quantity,
          res.description,
          res.brand,
          res.purchasePrice,
          res.salePrice,
          res.shelfCode,
          res.compatibleModels,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }

  delete(id: number): Observable<StockModel> {
    return this.http.delete<StockModel>(`${Config.serviceUrl}/${this.mainApiUrl}/${id}`)
    .pipe(map((res: any) => 
      {
        return new StockModel(
          res._id,
          res.stockCode,
          res.quantity,
          res.description,
          res.brand,
          res.purchasePrice,
          res.salePrice,
          res.shelfCode,
          res.compatibleModels,
          res.createdDate,
          res.updatedDate
        );
      }
    ));
  }



}
