import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpErrorResponse, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { finalize, map, catchError } from 'rxjs/operators';
import { CoreHelpers } from '../helpers/core.helpers';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private loadingService: LoadingService,
        private router: Router,
        private coreHelpers: CoreHelpers
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* Login sayfasında API'ye Request atıldıysa */
        /* diğer fonksiyonlara girmeden return ediyoruz. */
        if (request.url.indexOf('login') != -1) {
            return next.handle(request);
        }


        if (this.activeRequests === 0) {
            this.loadingService.startLoading();
        }

        this.activeRequests++;

        if (request.url.indexOf('login') == -1) {

            if (!this.authenticationService.currentUserValue) {
                this.coreHelpers.unauthorized();
                return;
            }

            let currentUser = this.authenticationService.currentUserValue;
            if (currentUser && currentUser.token) {
                request = request.clone({
                    setHeaders: {
                        token: `${currentUser.token}`
                    }
                });
            }
        }



        return next.handle(request)

            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.status == 401) {
                            this.coreHelpers.unauthorized();
                        }
                    }
                    return event;
                }),

                catchError((error: HttpErrorResponse) => {
                    if (error.status == 401) {
                        this.coreHelpers.unauthorized();
                    } else {
                        this.coreHelpers.serverErrorDialog(error);
                    }
                    return throwError(error);
                }),

                finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        setTimeout(() => {
                            this.loadingService.stopLoading();
                        }, 300);
                    }
                })
            );
    }
}