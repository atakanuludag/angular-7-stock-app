import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NgxCurrencyModule } from "ngx-currency";

/* App */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Helpers */
import { CoreHelpers } from './core/helpers/core.helpers';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

/* Other Component */
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { LoggedInComponent } from './core/layout/logged-in/logged-in.component';

/* Dashvoard Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';

/* Brand Components */
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BrandNewEditComponent } from './components/brand/brand-new-edit/brand-new-edit.component';

/* Stock Components */
import { StockListComponent } from './components/stock/stock-list/stock-list.component';
import { StockNewEditComponent } from './components/stock/stock-new-edit/stock-new-edit.component';
import { StockDetailDialogComponent } from './components/stock/stock-list/stock-detail-dialog/stock-detail-dialog.component';

/* Resolver  */
import { DashboardGetResolver } from './components/dashboard/dashboard.resolver';
import { BrandGetResolver, BrandListResolver } from './components/brand/brand.resolver';
import { StockGetResolver, StockListResolver } from './components/stock/stock.resolver';

/* Dialog Components */
import { ConfirmDialogComponent } from './core/layout/confirm-dialog/confirm-dialog.component';
import { ServerErrorDialogComponent } from './core/layout/server-error-dialog/server-error-dialog.component';


import { MatPaginatorTurkishLanguage } from './core/classes/matPaginatorTurkishLanguage.class';

const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: " TL",
  thousands: ".",
  nullable: false
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BrandListComponent,
    LoginComponent,
    NavigationComponent,
    LoggedInComponent,
    BrandNewEditComponent,
    ConfirmDialogComponent,
    ServerErrorDialogComponent,
    StockDetailDialogComponent,
    StockNewEditComponent,
    StockListComponent
  ],
  imports: [
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreHelpers
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MatPaginatorTurkishLanguage,
    DashboardGetResolver,
    BrandGetResolver,
    BrandListResolver,
    StockGetResolver,
    StockListResolver
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, ServerErrorDialogComponent, StockDetailDialogComponent]
})
export class AppModule { }
