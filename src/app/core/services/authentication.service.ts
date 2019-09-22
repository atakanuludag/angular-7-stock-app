import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app.config';
import { LoginModel } from '../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<LoginModel>;
  public currentUser: Observable<LoginModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
    return this.currentUserSubject.value;
  }

  login(login: LoginModel) {
    return this.http.post<any>(`${Config.serviceUrl}/login`, login)
      .pipe(map(user => {

        if (user && user.token) {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);

      if (!this.currentUserValue) {
        resolve();
      } else {
        reject();
      }

    });

  }


}
